import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PostDetailComponent } from './post-detail/post-detail';
import { AllPostsComponent } from './all-posts/all-posts';
import { About } from './about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'post-detail/:id', component: PostDetailComponent },
  { path: 'all-posts', component: AllPostsComponent },
  { path: 'about', component: About },
];