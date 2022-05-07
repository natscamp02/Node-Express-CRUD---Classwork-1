const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.route('/').get(projectController.getAllProjects).post(projectController.createProject);

// Note routes
router.get('/notes/:project_id/new', projectController.getAddNotesForm);
router.get('/notes/:note_id/edit', projectController.getEditNotesForm);

router.post('/notes/:project_id', projectController.createNote);
router.post('/notes/:project_id/:note_id/update', projectController.updateNote);
router.get('/notes/:project_id/:note_id/delete', projectController.deleteNote);

// Project notes
router.get('/new', projectController.getNewProjectForm);
router.get('/:id/edit', projectController.getEditProjectForm);
router.post('/:id/update', projectController.updateProject);
router.get('/:id/delete', projectController.deleteProject);

router.route('/:id').get(projectController.getProjectByID);

module.exports = router;
