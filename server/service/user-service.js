const User = require('../models/User')
const Class = require('../models/Class')

class UserService {
    async get_user(id) {
        try {
            const findUser = await User.findById(id)
            let ClassArray = []
            for (let i = 0; i < findUser.classes.length; i++) {
                ClassArray.push(findUser.classes[i].toString())
            }
            const findClasses = await Class.find({_id: {$in: ClassArray}})
            if (findUser && findClasses) {
                return {
                    data: {
                        user: findUser,
                        classes: findClasses
                    }, code: 200
                }
            } else {
                return {findUser, code: 200}
            }
        } catch (e) {
            console.log(e)
            return {message: '[INFO] Server error!', code: 500}
        }
    }

    async update_user(userId, code) {
        try {
            const user = await User.findById(userId)
            const classes = await Class.findOne({code: code})

            if (!user) {
                return {message: '[INFO] UserModel not found!', code: 400}
            }
            if (!classes) {
                const user_nb_of_classes = user.nb_of_classes
                const user_classes = user.classes
                const user_array = user_classes

                for (let i = 0; i < user_array.length; i++) {
                    const class_ = await Class.findOne({code: user_array[i].toString()})
                    if (!class_) {
                        user_array.splice(i, 1)
                        const userUpdate = await User.updateOne(
                            {_id: userId},
                            {
                                $set: {
                                    classes: user_array,
                                    nb_of_classes: user_nb_of_classes - 1,
                                },
                            },
                        )
                    }
                }

                return {message: '[INFO] Class Deleted!', code: 200}
            }

            const user_nb_of_classes = user.nb_of_classes
            const user_classes = user.classes
            const classId = classes._id
            const class_nb_of_student = classes.nb_of_student
            const class_student = classes.student

            const user_array = user_classes
            user_array.push(classId)
            const class_array = class_student
            class_array.push(userId)

            const userUpdate = await User.updateOne(
                {_id: userId},
                {
                    $set: {classes: user_array, nb_of_classes: user_nb_of_classes + 1},
                },
            )
            const classesUpdate = await Class.updateOne(
                {_id: classId},
                {
                    $set: {
                        student: class_array,
                        nb_of_student: class_nb_of_student + 1,
                    },
                },
            )

            return {message: '[OPTIONS] UserModel Updated!', code: 200}
        } catch (e) {
            console.log(e)
            return {message: '[INFO] Server error!', code: 500}
        }
    }
}

module.exports = new UserService()
