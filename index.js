const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

function checkProjects(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found!" });
  }

  return next();
}

function logRequests(req, res, next) {
  console.count("Númeor de requisições");

  return next();
}

server.use(logRequests);

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.put("/projects/:id", checkProjects, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjects, (req, res) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  projects.splice(project, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkProjects, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
