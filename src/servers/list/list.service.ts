import { ListModel } from '../../models/list.model';
import listJson from './list.json';
export class ListService {
    public static async addNewList(data: any) {
        return ListModel.create(data);
    }
    public static async getCategorySortList(slug: string): Promise<{
        category: string[];
        sort: { [index: string]: any };
    } | null> {
        const checkObject = listJson.find((item) => item.slug == slug);
        if (checkObject) {
            return {
                category: [],
                sort: checkObject.sort,
            };
        }
        const lists = await ListModel.find();
        const checkList = lists.find((item) => item.slug == slug);
        if (checkList) {
            return {
                category: checkList.category,
                sort: {},
            };
        }
        return null;
    }
}
