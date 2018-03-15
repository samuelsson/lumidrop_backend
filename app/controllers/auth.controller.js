import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const authController = {};

authController.login = (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).json({ message: 'We fucked up!' });
        if (!user) return res.status(401).json({ message: 'User not found.' });

        if (!user.validPassword(req.body.password)) {
            return res.status(401).json({ message: 'Wrong password.' });
        }

        return res.json({
            token: jwt.sign({ username: user.username, id: user.id }, 'THIS_IS_GOING_IN_ENV_CONF_LATER')
        });
    });
};

export default authController;
