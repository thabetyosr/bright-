const express = require('express');
const router = express.Router();
const Idea = require('../models/ideamodel');

// Route pour récupérer toutes les idées (ajoutées par l'utilisateur)
router.get('/', async (req, res) => {
  try {
    // Nous récupérons uniquement les idées ajoutées par l'utilisateur
    const ideas = await Idea.find({ isFixed: false });
    res.json(ideas);  // Nous renvoyons les idées avec leur _id
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des idées' });
  }
});

// Route pour ajouter une idée
router.post('/', async (req, res) => {
  const { user, idea } = req.body;

  if (!user || !idea) {
    return res.status(400).json({ message: 'Les champs utilisateur et idée sont obligatoires' });
  }

  try {
    const newIdea = new Idea({ user, idea, likes: 0, isFixed: false }); // Nouvelle idée non fixe
    await newIdea.save();
    res.status(201).json(newIdea);  // Renvoi de l'idée avec son _id
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'idée' });
  }
});

// Route pour supprimer une idée
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);  // Utilisation de _id pour la suppression

    if (!idea) {
      return res.status(404).json({ message: 'Idée non trouvée' });
    }

    res.status(200).json({ message: 'Idée supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'idée' });
  }
});

module.exports = router;
