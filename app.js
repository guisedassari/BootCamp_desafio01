const express = require("express");

const server = express();

server.use(express.json());

let numberOfRequests = 0;
const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  },
  {
    id: "2",
    title: "Desenvolver back end",
    tasks: ["Alterando projeto"]
  },
  {
    id: "3",
    title: "Desenvolver front end",
    tasks: ["create first project"]
  }
];

function checkProjectIdExists(req, res, next) {
  const project = projects.find(p => p.id == req.params.id);
  if (!project) {
    return res.status(400).json({ error: "Project id does not exists!" });
  }
  return next();
}

function logRequests(req, res, next) {
  numberOfRequests++;
  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}

server.use(logRequests);

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/project", (req, res) => {
  const { id, title, tasks } = req.body;

  const project = {
    id,
    title,
    tasks
  };

  projects.push(project);
  return res.json(projects);
});

server.get("/project/:id", checkProjectIdExists, (req, res) => {
  //   for (project of projects) {
  //     if (project.id == id) {
  //       return res.json(project);
  //     }
  //   }
  const project = projects.find(p => p.id == req.params.id);
  return res.json(project);
});

server.put("/project/:id", (req, res) => {
  const { title, tasks } = req.body;

  //   for (project of projects) {
  //     if (project.id == project_id) {
  //       project.title = title;
  //       project.tasks = tasks;
  //       return res.json(project);
  //     }
  //   }

  const project = projects.find(p => p.id == req.params.id);

  project.title = title;
  project.tasks = tasks;
  return res.json(project);
});

server.delete("/project/:id", (req, res) => {
  const projectIndex = projects.findIndex(p => p.id == req.params.id);
  projects.splice(projectIndex, 1);
  return res.json({ success: "project deleted successfully" });
});

server.post("/project/:id/tasks", (req, res) => {
  const project = projects.find(p => p.id == req.params.id);

  project.tasks.push(req.body.title);
  return res.json(project);
});

server.listen(3000);
