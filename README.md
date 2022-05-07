# Amber Academy - Node Express CRUD (Class Work)

# Instructions

You are required to create an application that allows the user to take information about software projects and the notes for the project.
It is expected that the projects table will have four (4) fields in addition to the ID field (primary key)

-   project_title
-   project_description
-   project_start_dt
-   project_due_dt

The Notes table will have three(3) fields in additio to the ID field (primary key)

-   project_id (foreign_key -> projects.id)
-   note
-   active_date
    After entering a project, the user should be able to select the project and would be presented with a form that allows for the entry of notes for that specific project.

In the table that displays the list of projects, the user should have the capability to click a link/button to display the list of notes for a specific project, the link/button should then direct the user to a page displaying the project details and the list of notes (in a table/list).

The notes displayed should be editable.

# How To Run

1. Clone the repository
1. Run 'npm install'
1. Run 'npm start'
