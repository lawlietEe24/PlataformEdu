import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Course } from '../interfaces/course.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesCollection;

  constructor(private firestore: Firestore) {
    this.coursesCollection = collection(this.firestore, 'courses');
  }


  getCourses(): Observable<Course[]> {
    return collectionData(this.coursesCollection, { idField: 'id' }) as Observable<Course[]>;
  }

  async addCourse(course: Course): Promise<void> {
    await addDoc(this.coursesCollection, course);
  }

  async updateCourse(course: Course): Promise<void> {
    const courseDocRef = doc(this.firestore, `courses/${course.id}`);
    await updateDoc(courseDocRef, { ...course });
  }

  async deleteCourse(id: string): Promise<void> {
    const courseDocRef = doc(this.firestore, `courses/${id}`);
    await deleteDoc(courseDocRef);
  }
}
