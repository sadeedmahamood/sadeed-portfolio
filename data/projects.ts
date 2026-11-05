// import type { Project } from "@/types";

// /**
//  * To add real links later, replace `github: null` / `live: null` with the
//  * actual URLs. To add a screenshot, drop it in /public/projects and set
//  * `image: { src: "/projects/name.png", alt: "..." }`.
//  */
// export const projects: Project[] = [
//   {
//     id: "nexora-crm",
//     index: "01",
//     title: "NEXORA CRM",
//     tagline: "Multi-tenant sales & CRM system",
//     description:
//       "A full-stack, multi-tenant CRM system designed around real-world sales workflows. NEXORA is structured as a modular monolith where organizations, users, leads, companies, contacts, deals, tasks and activities are separated into clear business domains. The system is designed around organization-level data isolation, role-based access and secure API communication, with background processing for email, notifications and scheduled tasks.",
//     stack: [
//       "Python",
//       "Django",
//       "DRF",
//       "PostgreSQL",
//       "Redis",
//       "Celery",
//       "React",
//       "Vite",
//       "Tailwind CSS",
//       "JWT",
//       "Docker",
//     ],
//     meta: [
//       { label: "Role", value: "Full-stack" },
//       { label: "Status", value: "In development", tone: "building" },
//       { label: "Architecture", value: "Modular monolith" },
//     ],
//     highlights: [
//       "Multi-tenant architecture with organization-level data isolation",
//       "User, organization, membership and role-based access management",
//       "Core CRM workflow covering leads, companies, contacts and deals",
//       "Task and activity management for sales follow-ups and customer interactions",
//       "JWT-based authentication with protected API endpoints",
//       "Organization-aware authorization to prevent cross-tenant data access",
//       "Dashboard, search, filtering, pagination and reporting capabilities",
//       "Redis and Celery planned for asynchronous emails, notifications and scheduled jobs",
//       "PostgreSQL relational data model with structured relationships and database constraints",
//       "Designed as a modular monolith with clear domain boundaries for future scalability",
//       "Under active development: features and architecture are still evolving.",
//     ],
//     github: null,
//     live: null,
//     image: {
//     src: "/projects/ecommerce-home.png",
//     alt: "Coordinator dashboard showing interview slots grouped by room and panel",
//   },
    
//   },
//   {
//     id: "placement-interview-scheduler",
//     index: "02",
//     title: "Placement Interview Scheduler",
//     tagline: "Automated placement interview scheduling & replanning system",
//     description:
//       "A full-stack placement interview scheduling system built to manage students, companies, interview panels, rooms and time slots at scale. The system takes shortlisted applications and generates interview schedules while considering room, panel, student and time availability. It also includes an automated replanning workflow that responds to real-world disruptions such as company delays, panel dropouts, room unavailability and student withdrawals while attempting to preserve valid existing schedules.",
//     stack: [
//       "Python",
//       "Django",
//       "DRF",
//       "PostgreSQL",
//       "React",
//       "Vite",
//       "JavaScript",
//     ],
//     meta: [
//       { label: "Role", value: "Full-stack" },
//       { label: "Focus", value: "Scheduling & replanning logic" },
//       { label: "Dataset", value: "800+ students" },
//     ],
//     highlights: [
//       "Models students, companies, applications, shortlists, panels, rooms and interviews",
//       "Application shortlisting based on placement requirements and company criteria",
//       "Automated assignment of interview time slots, rooms and panels",
//       "Conflict detection across students, rooms, panels and interview time ranges",
//       "Interview duration is used to calculate valid start and end times",
//       "Supports multiple interview days and availability windows",
//       "Automated replanning after company delays or other scheduling disturbances",
//       "Handles panel dropouts, room unavailability and student withdrawals",
//       "Replanning attempts to minimize unnecessary changes to already valid schedules",
//       "Coordinator dashboard displaying scheduled, unscheduled and withdrawn interviews",
//       "Change summary showing the effect of replanning on interview assignments",
//       "Tested with large generated datasets containing around 800 students, 35 companies and 20 rooms",
//       "React frontend communicates with Django REST APIs for schedule retrieval and replanning",
//     ],
//     github: "https://github.com/sadeedmahamood/placement-interview-scheduler",
//     live: null,
//     image: {
//     src: "/projects/ecommerce-home.png",
//     alt: "Coordinator dashboard showing interview slots grouped by room and panel",
//   },
//   },
//   {
//     id: "fullstack-ecommerce",
//     index: "03",
//     title: "Full-Stack E-commerce",
//     tagline: "React storefront powered by a Django REST API",
//     description:
//       "A complete full-stack e-commerce application built with React on the frontend and Django REST Framework on the backend. The application implements secure authentication, protected routes, product browsing, shopping cart and order workflows, administrative product management and online payments through Razorpay. The frontend communicates with the backend through REST APIs using Axios, while the database manages users, products, carts, orders and payment-related information.",
//     stack: [
//       "Python",
//       "Django",
//       "DRF",
//       "JWT",
//       "SQLite",
//       "MySQL",
//       "React",
//       "React Router",
//       "Axios",
//       "Tailwind CSS",
//       "Razorpay",
//     ],
//     meta: [
//       { label: "Role", value: "Full-stack" },
//       { label: "Status", value: "Complete", tone: "done" },
//       { label: "Architecture", value: "REST API + SPA" },
//     ],
//     highlights: [
//       "Full-stack architecture with a React frontend and Django REST backend",
//       "User registration and login with JWT authentication",
//       "Protected frontend routes for authenticated functionality",
//       "REST API integration between React and Django using Axios",
//       "Product listing and product detail functionality",
//       "Shopping cart workflow for adding, updating and managing products",
//       "Order creation and order management functionality",
//       "Administrative dashboard for product management",
//       "Product CRUD operations through the backend",
//       "Razorpay integration for online payment processing",
//       "Responsive frontend interface built with Tailwind CSS",
//       "Database-backed management of users, products, carts, orders and payments",
//       "Experience with both SQLite and MySQL during development",
//     ],
//     github: null,
//     live: null,
// // NEXORA CRM: two videos
//     media: [
//     {
//     type: "video",
//     src: "/projects/nexora-dashboard.mp4",
//     poster: "/projects/nexora-dashboard-poster.png",
//     alt: "NEXORA CRM dashboard with pipeline and activity overview",
//     label: "Dashboard",
//     },
//     {
//     type: "video",
//     src: "/projects/nexora-deals.mp4",
//     alt: "Moving a deal through pipeline stages in NEXORA CRM",
//     label: "Deals workflow",
//     },
// ],
//   },
//   {
//     id: "bookswap",
//     index: "04",
//     title: "BookSwap",
//     tagline: "Community book exchange powered by a virtual Book Coins system",
//     description:
//       "A community-focused book exchange platform built with Python and Django. BookSwap introduces a virtual Book Coins system that provides an alternative way for users to exchange books and interact with the platform. The application manages users, books and transactions through a database-backed Django application, with a responsive frontend built using HTML, CSS and Bootstrap.",
//     stack: [
//       "Python",
//       "Django",
//       "SQLite",
//       "HTML",
//       "CSS",
//       "Bootstrap",
//     ],
//     meta: [
//       { label: "Role", value: "Full-stack" },
//       { label: "Type", value: "Book exchange platform" },
//     ],
//     highlights: [
//       "Community-oriented platform for exchanging books",
//       "Virtual Book Coins system for book trading and user interactions",
//       "User management and book listing functionality",
//       "Transaction data management through Django",
//       "SQLite database for persistent application data",
//       "Backend functionality developed using Python and Django",
//       "Responsive frontend pages built with HTML, CSS and Bootstrap",
//       "Designed around a simple exchange-based user workflow",
//     ],
//     github: null,
//     live: null,
//     image: {
//     src: "/projects/ecommerce-home.png",
//     alt: "Coordinator dashboard showing interview slots grouped by room and panel",
//   },
//   },
// ];


import type { Project } from "@/types";

/**
 * To add real links later, replace `github: null` / `live: null` with the
 * actual URLs.
 *
 * To add a video or screenshot, drop the file in /public/projects and add a
 * `media` list to the project. The first item shows by default; the rest
 * appear when "Highlights" is opened:
 *
 *   media: [
 *     { type: "video", src: "/projects/name.mp4", alt: "...", label: "Dashboard" },
 *     { type: "image", src: "/projects/name.png", alt: "...", label: "Screen" },
 *   ],
 */
export const projects: Project[] = [
  {
    id: "nexora-crm",
    index: "01",
    title: "NEXORA CRM",
    tagline: "Multi-tenant sales & CRM system",
    description:
      "A full-stack, multi-tenant CRM system designed around real-world sales workflows. NEXORA is structured as a modular monolith where organizations, users, leads, companies, contacts, deals, tasks and activities are separated into clear business domains. The system is designed around organization-level data isolation, role-based access and secure API communication, with background processing for email, notifications and scheduled tasks.",
    stack: [
      "Python",
      "Django",
      "DRF",
      "PostgreSQL",
      "Redis",
      "Celery",
      "React",
      "Vite",
      "Tailwind CSS",
      "JWT",
      "Docker",
    ],
    meta: [
      { label: "Role", value: "Full-stack" },
      { label: "Status", value: "In development", tone: "building" },
      { label: "Architecture", value: "Modular monolith" },
    ],
    highlights: [
      "Multi-tenant architecture with organization-level data isolation",
      "User, organization, membership and role-based access management",
      "Core CRM workflow covering leads, companies, contacts and deals",
      "Task and activity management for sales follow-ups and customer interactions",
      "JWT-based authentication with protected API endpoints",
      "Organization-aware authorization to prevent cross-tenant data access",
      "Dashboard, search, filtering, pagination and reporting capabilities",
      "Redis and Celery planned for asynchronous emails, notifications and scheduled jobs",
      "PostgreSQL relational data model with structured relationships and database constraints",
      "Designed as a modular monolith with clear domain boundaries for future scalability",
      "Under active development: features and architecture are still evolving.",
    ],
    github: null,
    live: null,
    // REPLACE: uncomment once you have recorded these and put them in /public/projects
    media: [
      {
        type: "image",
        src: "/projects/Q_mark_image.png",
        alt: "NEXORA CRM dashboard with pipeline and activity overview",
        label: "Dashboard",
      },
      // {
      //   type: "video",
      //   src: "/projects/e-commerce-vdo-2-main.mp4",
      //   alt: "Moving a deal through pipeline stages in NEXORA CRM",
      //   label: "Deals workflow",
      // },
    ],
  },
  {
    id: "placement-interview-scheduler",
    index: "02",
    title: "Placement Interview Scheduler",
    tagline: "Automated placement interview scheduling & replanning system",
    description:
      "A full-stack placement interview scheduling system built to manage students, companies, interview panels, rooms and time slots at scale. The system takes shortlisted applications and generates interview schedules while considering room, panel, student and time availability. It also includes an automated replanning workflow that responds to real-world disruptions such as company delays, panel dropouts, room unavailability and student withdrawals while attempting to preserve valid existing schedules.",
    stack: [
      "Python",
      "Django",
      "DRF",
      "PostgreSQL",
      "React",
      "Vite",
      "JavaScript",
    ],
    meta: [
      { label: "Role", value: "Full-stack" },
      { label: "Focus", value: "Scheduling & replanning logic" },
      { label: "Dataset", value: "~800 students" },
    ],
    highlights: [
      "Models students, companies, applications, shortlists, panels, rooms and interviews",
      "Application shortlisting based on placement requirements and company criteria",
      "Automated assignment of interview time slots, rooms and panels",
      "Conflict detection across students, rooms, panels and interview time ranges",
      "Interview duration is used to calculate valid start and end times",
      "Supports multiple interview days and availability windows",
      "Automated replanning after company delays or other scheduling disturbances",
      "Handles panel dropouts, room unavailability and student withdrawals",
      "Replanning attempts to minimize unnecessary changes to already valid schedules",
      "Coordinator dashboard displaying scheduled, unscheduled and withdrawn interviews",
      "Change summary showing the effect of replanning on interview assignments",
      "Tested with large generated datasets containing around 800 students, 35 companies and 20 rooms",
      "React frontend communicates with Django REST APIs for schedule retrieval and replanning",
    ],
    github: "https://github.com/sadeedmahamood/placement-interview-scheduler",
    live: null,
    // REPLACE: add a real screenshot or recording of the coordinator dashboard
    media: [
      {
        type: "video",
        src: "/projects/Placement_Scheduler.mp4",
        alt: "NEXORA CRM dashboard with pipeline and activity overview",
        label: "Dashboard",
      },
      // {
      //   type: "video",
      //   src: "/projects/Placement_Scheduler.mp4",
      //   alt: "Moving a deal through pipeline stages in NEXORA CRM",
      //   label: "Deals workflow",
      // },
    ],
  },
  {
    id: "fullstack-ecommerce",
    index: "03",
    title: "Full-Stack E-commerce",
    tagline: "React storefront powered by a Django REST API",
    description:
      "A complete full-stack e-commerce application built with React on the frontend and Django REST Framework on the backend. The application implements secure authentication, protected routes, product browsing, shopping cart and order workflows, administrative product management and online payments through Razorpay. The frontend communicates with the backend through REST APIs using Axios, while the database manages users, products, carts, orders and payment-related information.",
    stack: [
      "Python",
      "Django",
      "DRF",
      "JWT",
      "SQLite",
      "MySQL",
      "React",
      "React Router",
      "Axios",
      "Tailwind CSS",
      "Razorpay",
    ],
    meta: [
      { label: "Role", value: "Full-stack" },
      { label: "Status", value: "Complete", tone: "done" },
      { label: "Architecture", value: "REST API + SPA" },
    ],
    highlights: [
      "Full-stack architecture with a React frontend and Django REST backend",
      "User registration and login with JWT authentication",
      "Protected frontend routes for authenticated functionality",
      "REST API integration between React and Django using Axios",
      "Product listing and product detail functionality",
      "Shopping cart workflow for adding, updating and managing products",
      "Order creation and order management functionality",
      "Administrative dashboard for product management",
      "Product CRUD operations through the backend",
      "Razorpay integration for online payment processing",
      "Responsive frontend interface built with Tailwind CSS",
      "Database-backed management of users, products, carts, orders and payments",
      "Experience with both SQLite and MySQL during development",
    ],
    github: "https://github.com/sadeedmahamood/fullstack-ecommerce",
    live: null,
    media: [
      {
        type: "video",
        src: "/projects/e-commerce-vdo-1-main.mp4",
        alt: "NEXORA CRM dashboard with pipeline and activity overview",
        label: "Dashboard",
      },
      // {
      //   type: "video",
      //   src: "/projects/e-commerce-vdo-2-main.mp4",
      //   alt: "Moving a deal through pipeline stages in NEXORA CRM",
      //   label: "Deals workflow",
      // },
    ],
  },
  {
    id: "bookswap",
    index: "04",
    title: "BookSwap",
    tagline: "Community book exchange powered by a virtual Book Coins system",
    description:
      "A community-focused book exchange platform built with Python and Django. BookSwap introduces a virtual Book Coins system that provides an alternative way for users to exchange books and interact with the platform. The application manages users, books and transactions through a database-backed Django application, with a responsive frontend built using HTML, CSS and Bootstrap.",
    stack: ["Python", "Django", "SQLite", "HTML", "CSS", "Bootstrap"],
    meta: [
      { label: "Role", value: "Full-stack" },
      { label: "Type", value: "Book exchange platform" },
    ],
    highlights: [
      "Community-oriented platform for exchanging books",
      "Virtual Book Coins system for book trading and user interactions",
      "User management and book listing functionality",
      "Transaction data management through Django",
      "SQLite database for persistent application data",
      "Backend functionality developed using Python and Django",
      "Responsive frontend pages built with HTML, CSS and Bootstrap",
      "Designed around a simple exchange-based user workflow",
    ],
    github: "https://github.com/sadeedmahamood/BOOKSWAP",
    live: null,
        media: [
      {
        type: "video",
        src: "/projects/book_swap-vdo-1.mp4",
        alt: "NEXORA CRM dashboard with pipeline and activity overview",
        label: "Dashboard",
      },
      // {
      //   type: "video",
      //   src: "/projects/book-swap-vdo-2.mp4",
      //   alt: "Moving a deal through pipeline stages in NEXORA CRM",
      //   label: "Deals workflow",
      // },
    ],
  },
];