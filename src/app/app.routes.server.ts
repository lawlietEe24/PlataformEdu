import { RenderMode, ServerRoute } from '@angular/ssr';
import { Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
