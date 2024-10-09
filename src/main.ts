import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { BookListComponent } from './app/components/book-list/book-list.component';
import { routes } from './app/app.routes'; // Import the routes from the file you created
import { AppComponent } from './app/app.component';

// bootstrapApplication(BookListComponent, {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(), // Use this instead of HttpClientModule
//   ],
// });

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Add this line to provide the HttpClient
    provideRouter(routes), // If using routes
  ],
}).catch((err) => console.error(err));
