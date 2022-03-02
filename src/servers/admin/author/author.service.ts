import {AuthorModel} from '../../../models/author.model';

export class AuthorService {
    public static getTotalAuthor() {
        return AuthorModel.find().count();
    }
    public static getAuthorByPage(page, perPage) {
        return AuthorModel.find().skip((perPage * page) - perPage).limit(perPage).sort({createdAt: -1});
    }
    public static async changeStatus(id) {
        const author = await AuthorModel.findOne({_id: id});

        if (author.status === 1) {
            author.status = 0;
        }
        else {
            author.status = 1;
        }
        return author.save();
    }
    public static deleteAuthor(id) {
        return AuthorModel.deleteOne({_id: id});
    }
}

export default AuthorService;