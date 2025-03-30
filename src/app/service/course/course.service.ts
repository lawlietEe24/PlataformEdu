import { Injectable } from "@angular/core";
import { collection, Firestore, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "@angular/fire/firestore";
import { Course } from "../../interfaces/course.model";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Injectable({
  providedIn: "root",
})


export class CourseService {
  constructor(private firestore: Firestore) {}

  // ✅ Crear un curso
  addCourse(course: Course) {
    const courseRef = collection(this.firestore, "courses");
    return addDoc(courseRef, course);
  }

  // ✅ Obtener todos los cursos
  async getAllCourses() {
    const querySnapshot = await getDocs(collection(this.firestore, "courses"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Course;
      return { id: doc.id, ...data };
    });
  }

  // ✅ Obtener un curso por ID
  async getCourseById(courseId: string) {
    const docRef = doc(this.firestore, "courses", courseId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...(docSnap.data() as unknown as Course) };
    } else {
      throw new Error("El curso no existe.");
    }
  }

  // ✅ Actualizar curso
  async updateCourse(courseId: string, updatedData: Partial<Course>) {
    const courseRef = doc(this.firestore, "courses", courseId);
    return updateDoc(courseRef, updatedData);
  }

  // ✅ Eliminar curso
  async deleteCourse(courseId: string) {
    const courseRef = doc(this.firestore, "courses", courseId);
    return deleteDoc(courseRef);
  }
}
