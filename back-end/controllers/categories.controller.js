const Category = require("../models/categories.model")

exports.createCategory = function(name, user = null) {
    let newCategory = new Category({ name })

    if(user) {
        newCategory.users = [user]
    }

    newCategory.save(err => {
        if (err) {
            console.log(err)
        }

        return newCategory
    })
}

exports.addUser = async (catName, uid, confidence) => {
    const cat = await Category.findOne({ name: catName })
    let userInCat = cat.users.some(el => {
        return el._user_id == uid
    })

    // Check if user is already in
    if (userInCat) {
        // User in category
        cat.users.forEach((user, index) => {
            // Find user to update
            if (user._user_id == uid) {
                let { articles_written, confidence } = cat.users[index]

                cat.users[index].articles_written++
                cat.users[index].confidence += confidence
                return
            }
        })

        return await cat.save()
    } else {
        // User not in category
        cat.users.push({
            _user_id: uid,
            articles_written: 1,
            confidence
        })

        return await cat.save()
    }
}
