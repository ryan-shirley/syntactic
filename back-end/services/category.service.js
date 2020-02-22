const Category = require("../models/categories.model")

/**
 * createCategory() Create new category
 */
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

                // Find parent category
                Category.findOne({ name: parent_name }).then(cat => {
                    newCategory._parent_category_id = cat._id

                    // Save category
                    newCategory.save(err => {
                        if (err) {
                            reject(err)
                        }

                        resolve(newCategory)
                    })
                })
            } else {
                // No parent category
                // Save category
                newCategory.save(err => {
                    if (err) {
                        reject(err)
                    }
                    resolve(newCategory)
                })
            }
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}

/**
 * addUser() Adds user to category
 */
exports.addUser = async (catName, userID, confidence) => {
    const cat = await Category.findOne({ name: catName })

    let userInCat = cat.users.some(el => {
        return escape(el.user) === escape(userID)
    })

    // Check if user is already in
    if (userInCat) {
        // User in category
        cat.users.forEach((user, index) => {
            // Find user to update
            if (escape(user.user) === escape(userID)) {
                cat.users[index].articles_written++
                cat.users[index].confidence += confidence
                return
            }
        })

        return await cat.save()
    } else {
        // User not in category
        cat.users.push({
            user: userID,
            articles_written: 1,
            confidence
        })

        return await cat.save()
    }
}

/**
 * checkExists() Check if category exists by name
 */
exports.checkExists = name => {
    return new Promise((resolve, reject) => {
        try {
            Category.findOne({ name }, (err, doc) => {
                if (doc) {
                    resolve({
                        exists: true
                    })
                } else {
                    resolve({
                        exists: false
                    })
                }
            })
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}

/**
 * findOneByName() Check if category exists by name
 */
exports.findOneByName = async (name, userId) => {
    let category = await Category.findOne({ name }, function (err, category) {
        if (err) throw err

        return category
    })
    

    return category
}

/**
 * getSubCategories() Return sub categories from one category
 */
exports.getSubCategories = async parentId => {
    let categoryList = await Category.find({ _parent_category_id: parentId }, function (err, categories) {
        if (err) throw err

        return categories
    })

    // Check Sub Categories for the sub categories
    for (var i = 0; i < categoryList.length; i++) {
        let subCategories = categoryList[i]

        let categories = await Category.find({ _parent_category_id: subCategories._id }, function (err, categories) {
            if (err) throw err
    
            return categories
        })

        if(categories) {
            categoryList = categoryList.concat(categories)
        }
    }

    return categoryList
}