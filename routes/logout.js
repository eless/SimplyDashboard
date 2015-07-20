/**
 * Created by Eless on 19.07.2015.
 */
exports.router = function(req, res){
    req.logout();
    res.redirect('/');
};