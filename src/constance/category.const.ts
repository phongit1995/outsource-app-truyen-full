interface CategoryType {
    id: number;
    name: string;
}
export const CATEGORY_TYPE: CategoryType[] = [
    {
        id: 32,
        name: 'Bách Hợp',
    },
    {
        id: 35,
        name: 'Cổ Đại',
    },
    {
        id: 27,
        name: 'Cung Đấu',
    },
    {
        id: 31,
        name: 'Đam Mỹ',
    },
    {
        id: 14,
        name: 'Dị Giới',
    },
    {
        id: 15,
        name: 'Dị Năng',
    },
    {
        id: 34,
        name: 'Điền Văn',
    },
    {
        id: 8,
        name: 'Đô Thị',
    },
    {
        id: 42,
        name: 'Đoản Văn',
    },
    {
        id: 30,
        name: 'Đông Phương',
    },
    {
        id: 29,
        name: 'Gia Đấu',
    },
    {
        id: 33,
        name: 'Hài Hước',
    },
    {
        id: 12,
        name: 'Hệ Thống',
    },
    {
        id: 13,
        name: 'Huyền Huyễn',
    },
    {
        id: 43,
        name: 'Khác',
    },
    {
        id: 11,
        name: 'Khoa Huyễn',
    },
    {
        id: 2,
        name: 'Kiếm Hiệp',
    },
    {
        id: 17,
        name: 'Lịch Sử',
    },
    {
        id: 40,
        name: 'Light Novel',
    },
    {
        id: 23,
        name: 'Linh Dị',
    },
    {
        id: 36,
        name: 'Mạt Thế',
    },
    {
        id: 7,
        name: 'Ngôn Tình',
    },
    {
        id: 25,
        name: 'Ngược',
    },
    {
        id: 28,
        name: 'Nữ Cường',
    },
    {
        id: 39,
        name: 'Nữ Phụ',
    },
    {
        id: 38,
        name: 'Phương Tây',
    },
    {
        id: 16,
        name: 'Quân Sự',
    },
    {
        id: 9,
        name: 'Quan Trường',
    },
    {
        id: 24,
        name: 'Sắc',
    },
    {
        id: 26,
        name: 'Sủng',
    },
    {
        id: 22,
        name: 'Thám Hiểm',
    },
    {
        id: 1,
        name: 'Tiên Hiệp',
    },
    {
        id: 21,
        name: 'Trinh Thám',
    },
    {
        id: 20,
        name: 'Trọng Sinh',
    },
    {
        id: 37,
        name: 'Truyện Teen',
    },
    {
        id: 41,
        name: 'Việt Nam',
    },
    {
        id: 10,
        name: 'Võng Du',
    },
    {
        id: 18,
        name: 'Xuyên Không',
    },
    {
        id: 19,
        name: 'Xuyên Nhanh',
    },
];
export const getCategoryById = (id: number): string | null => {
    let result = CATEGORY_TYPE.find((e) => e.id == id);
    return result ? result.name : null;
};
