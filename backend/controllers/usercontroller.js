const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const registerUser = async (req, res) => {
  try {
    const { name, alias, email, password } = req.body;

    // Validation du schéma avec Joi
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email déjà utilisé',
      });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, alias, email, password: hashedPassword });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    // Réponse de succès
    res.status(201).json({
      success: true,
      message: 'Utilisateur enregistré avec succès',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};







const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1d' });

      // Réponse de succès
      res.status(200).json({
        success: true,
        message: 'Connexion réussie',
        token,
      });
    } else {
      // Réponse d'erreur pour les identifiants invalides
      res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect',
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};









const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};





const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  alias: Joi.string().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { userSchema };

module.exports = { registerUser, loginUser, getUserProfile };
