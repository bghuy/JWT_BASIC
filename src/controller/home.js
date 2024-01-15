
import userService from '../service/userService';
const handleHome = (req, res) => {

    return res.render("home.ejs");
}
const handleUser = async (req, res) => {
    const users = await userService.fetchAll();
    return res.render("user.ejs", { users: users });
}
const handleCreateNewUser = async (req, res) => {
    const { email, username, password } = req.body;
    await userService.add(email, username, password);
    await userService.fetchAll();
    // fields contains extra meta data about results, if available
    return res.redirect("back")
}
const handleDeleteUser = async (req, res) => {
    const id = req.params.id;
    await userService.remove(id);
    return res.redirect("back")
}
const renderUpdatePage = async (req, res) => {
    const id = req.params.id;
    const user = await userService.fetch(id);
    if (user) {
        return res.render("update.ejs", { user: user });
    }
    else {
        return res.redirect("/user");
    }


}
const handleUpdateUser = async (req, res) => {
    const { email, username, id } = req.body;
    await userService.update(email, username, id);
    return res.redirect("/user");
}

module.exports = { handleHome, handleUser, handleCreateNewUser, handleDeleteUser, renderUpdatePage, handleUpdateUser };