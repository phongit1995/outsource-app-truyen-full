import {AuthorModel} from '../../../models/author.model';

export class AuthorService {
    public static getTotalAuthor() {
        return AuthorModel.find().count();
    }
    public static getAuthorById(id: string) {
        return AuthorModel.findOne({_id: id});
    }
    public static getAuthorByPage(page: number, perPage: number) {
        return AuthorModel.find().skip((perPage * page) - perPage).limit(perPage).sort({createdAt: -1});
    }
    public static createAuthor(name: string, status: number) {
        const newAuthor = new AuthorModel({name, status});

        return newAuthor.save();
    }
    public static async updateAuthor(id: string, name: string) {
        const author = await AuthorModel.findOne({_id: id});

        author.name = name;
        return author.save();
    }
    public static async changeStatus(id: string) {
        const author = await AuthorModel.findOne({_id: id});

        if (author.status === 1) {
            author.status = 0;
        }
        else {
            author.status = 1;
        }
        return author.save();
    }
    public static deleteAuthor(id: string) {
        return AuthorModel.deleteOne({_id: id});
    }
}

export default AuthorService;