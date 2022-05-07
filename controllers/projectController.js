const conn = require('../db');
const { handleSQLError, handleExpressError, restrictFields } = require('../utils');

////////////////////////////////////////////////////////////////
// PROJECTS
////////////////////////////////////////////////////////////////

/** Gets all projects stored in database */
exports.getAllProjects = handleExpressError((_, res) => {
	let queryStr = `SELECT * FROM projects;`;

	conn.query(
		queryStr,
		handleSQLError((results) => {
			res.status(200).render('projects', {
				projects: results,
			});
		})
	);
});

/** Gets a project by id and all associated notes */
exports.getProjectByID = handleExpressError((req, res) => {
	let projectsQueryStr = 'SELECT * FROM projects WHERE id =' + req.params.id + ';';

	conn.query(
		projectsQueryStr,
		handleSQLError((projects) => {
			let notesQueryStr =
				'SELECT * from notes WHERE project_id = ' + req.params.id + ' ORDER BY active_date ASC;';

			conn.query(
				notesQueryStr,
				handleSQLError((notes) => {
					res.status(200).render('project-details', {
						title: projects[0].title,
						project: projects[0],
						notes,
					});
				})
			);
		})
	);
});

/** Shows the new project form */
exports.getNewProjectForm = handleExpressError((_, res) => {
	res.status(200).render('project-form', {
		pageTitle: 'New project',
		project: null,
	});
});

/** Shows the project edit form */
exports.getEditProjectForm = handleExpressError((req, res) => {
	let projectsQueryStr = 'SELECT * FROM projects pjs WHERE id =' + req.params.id + ';';

	conn.query(
		projectsQueryStr,
		handleSQLError((projects) => {
			res.status(200).render('project-form', {
				pageTitle: 'Edit project',
				project: projects[0],
			});
		})
	);
});

/** Create a new project */
exports.createProject = handleExpressError((req, res) => {
	let data = restrictFields(req.body, 'title', 'description', 'start_date', 'due_date');

	let values = Object.values(data)
		.map((v) => `${typeof v === 'string' ? "'" + v.trim() + "'" : v}`)
		.join(', ');

	let queryStr = 'INSERT INTO projects (' + Object.keys(data).join(', ') + ') VALUES (' + values + ');';

	conn.query(
		queryStr,
		handleSQLError(() => {
			res.redirect('/projects');
		})
	);
});

/** Edits an existing project */
exports.updateProject = handleExpressError((req, res) => {
	let data = restrictFields(req.body, 'title', 'description', 'start_date', 'due_date');

	let entries = Object.entries(data).map((e) => `${e[0]} = '${typeof e[1] === 'string' ? e[1].trim() : e[1]}'`);

	let queryStr = 'UPDATE projects SET ' + entries.join(', ') + ' WHERE id = ' + req.params.id + ';';

	conn.query(
		queryStr,
		handleSQLError(() => {
			res.redirect('/projects/' + req.params.id);
		})
	);
});

/** Delete an existing project and all associated notes */
exports.deleteProject = handleExpressError((req, res) => {
	let queryStr = 'DELETE FROM projects WHERE id = ' + req.params.id + ';';

	conn.query(
		queryStr,
		handleSQLError(() => {
			res.redirect('/projects');
		})
	);
});

////////////////////////////////////////////////////////////////
// NOTES
////////////////////////////////////////////////////////////////

/** Shows the 'add note' form */
exports.getAddNotesForm = handleExpressError((req, res) => {
	res.status(200).render('notes-form', {
		page_title: 'Add note',
		project_id: req.params.project_id,
		note: null,
	});
});

/** Shows the 'edit note' form */
exports.getEditNotesForm = handleExpressError((req, res) => {
	let queryStr = 'SELECT * FROM notes WHERE id = ' + req.params.note_id + ';';

	conn.query(
		queryStr,
		handleSQLError((notes) => {
			res.status(200).render('notes-form', {
				page_title: 'Edit note',
				note: notes[0],
			});
		})
	);
});

/** Create a note for the specified project */
exports.createNote = handleExpressError((req, res) => {
	let data = restrictFields(req.body, 'note');
	data.active_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
	data.project_id = parseInt(req.params.project_id);

	let values = Object.values(data)
		.map((v) => `${typeof v === 'string' ? "'" + v + "'" : v}`)
		.join(', ');

	let queryStr = 'INSERT INTO notes (' + Object.keys(data).join(', ') + ') VALUES (' + values + ');';

	conn.query(
		queryStr,
		handleSQLError(() => {
			res.redirect('/projects/' + req.params.project_id);
		})
	);
});

/** Edits an project's note */
exports.updateNote = handleExpressError((req, res) => {
	let data = restrictFields(req.body, 'note');

	let entries = Object.entries(data).map((e) => `${e[0]} = '${typeof e[1] === 'string' ? e[1].trim() : e[1]}'`);

	let queryStr = 'UPDATE notes SET ' + entries.join(', ') + ' WHERE id = ' + req.params.note_id + ';';

	conn.query(
		queryStr,
		handleSQLError(() => {
			res.redirect('/projects/' + req.params.project_id);
		})
	);
});

/** Delete an project's note */
exports.deleteNote = handleExpressError((req, res) => {
	let queryStr = 'DELETE FROM notes WHERE id = ' + req.params.note_id + ';';

	conn.query(
		queryStr,
		handleSQLError(() => {
			res.redirect('/projects/' + req.params.project_id);
		})
	);
});
