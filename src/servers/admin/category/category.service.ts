import {CategoryModel} from '../../../models/category.model';
import {makeSlug} from "../../../common/text.helper";

export class CategoryService {
    public static getAllCategory() {
        return CategoryModel.find().sort({createdAt: -1});
    }
    public static getCategoryById(id) {
        return CategoryModel.findOne({_id: id});
    }
    public static createCategory({name, title, slug}) {
        const newCategory = new CategoryModel({
            name, title, slug
        });

        return newCategory.save();
    }
    public static async changeStatus(id) {
        const category = await CategoryModel.findOne({_id: id});
        if (category.status === 1) {
            category.status = 0;
        }else {
            category.status = 1;
        }

        return category.save();
    }
    public static async updateCategory({id, newName, newTitle}) {
        const category = await CategoryModel.findOne({_id: id});

        category.name = newName;
        category.title = newTitle;
        category.slug = makeSlug(newName);
        return category.save();
    }
    public static deleteCategory(id) {
        return CategoryModel.deleteOne({_id: id});
    }
}

export default CategoryService;
