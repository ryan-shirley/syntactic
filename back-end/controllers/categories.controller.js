const Category = require("../models/categories.model")

exports.createCategory = (name, parent_name = null, user = null) => {
    return new Promise((resolve, reject) => {
        try {
            // Define category with name
            let newCategory = new Category({ name })

            // Add user if required
            if (user !== null) {
                newCategory.users = [user]
            }

            // Check if parent category is required
            if (parent_name !== null) {
                // Parent category required
                console.log(
                    `Trying to create category with parent: ${parent_name}. With ${name}`
                )

                // Find parent category
                Category.findOne({ name: parent_name }).then(cat => {
                    // console.log(
                    //     `Found parent with name: ${parent_name}.`
                    // )
                    newCategory._parent_category_id = cat._id

                    // Save category
                    newCategory.save(err => {
                        if (err) {
                            reject(err)
                        }

                        console.log(`Created category: ${name}`)
                        resolve(newCategory)
                    })
                })
            } else {
                // No parent category
                // console.log(`Creating category: ${name}`)

                // Save category
                newCategory.save(err => {
                    if (err) {
                        reject(err)
                    }

                    console.log(`Created category: ${name}`)
                    resolve(newCategory)
                })
            }
        } catch (error) {
            console.error(error)
            reject(error)
        }
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

exports.checkExists = name => {
    return new Promise((resolve, reject) => {
        try {
            Category.findOne({ name }, (err, doc) => { 
                if(doc){
                    resolve({
                        exists: true
                    })
                }
                else {
                    resolve({
                        exists: false
                    })
                }
            }); 
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}