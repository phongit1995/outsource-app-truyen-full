type CategoryType = {
    type: string;
    name: string;
};
export const ECategoryType: CategoryType[] = [
    {
        type: 'bach-hop',
        name: 'Bách Hợp',
    },
    {
        type: 'co-dai',
        name: 'Cổ Đại',
    },
    {
        type: 'cung-dau',
        name: 'Cung Đấu',
    },
    {
        type: 'di-gioi',
        name: 'Dị Giới',
    },
    {
        type: 'di-nang',
        name: 'Dị Năng',
    },
    {
        type: 'dien-van',
        name: 'Điền Văn',
    },
    {
        type: 'do-thi',
        name: 'Đô Thị',
    },
    {
        type: 'doan-van',
        name: 'Đoản Văn',
    },
    {
        type: 'dong-phuong',
        name: 'Đông Phương',
    },
    {
        type: 'gia-dau',
        name: 'Gia Đấu',
    },
    {
        type: 'hai-huoc',
        name: 'Hài Hước',
    },
    {
        type: 'he-thong',
        name: 'Hệ Thống',
    },
    {
        type: 'huyen-huyen',
        name: 'Huyền Huyễn',
    },
    {
        type: 'khac',
        name: 'Khác',
    },
    {
        type: 'khoa-huyen',
        name: 'Khoa Huyễn',
    },
    {
        type: 'kiem-hiep',
        name: 'Kiếm Hiệp',
    },
    {
        type: 'lich-su',
        name: 'Lịch Sử',
    },
    {
        type: 'light-novel',
        name: 'Light Novel',
    },
    {
        type: 'linh-di',
        name: 'Linh Dị',
    },
    {
        type: 'mat-the',
        name: 'Mạt Thế',
    },
    {
        type: 'ngon-tinh',
        name: 'Ngôn Tình',
    },
    {
        type: 'nguoc',
        name: 'Ngược',
    },
    {
        type: 'nu-cuong',
        name: 'Nữ Cường',
    },
    {
        type: 'nu-phu',
        name: 'Nữ Phụ',
    },
    {
        type: 'phuong-tay',
        name: 'Phương Tây',
    },
    {
        type: 'quan-su',
        name: 'Quân Sự',
    },
    {
        type: 'quan-truong',
        name: 'Quan Trường',
    },
    {
        type: 'sac',
        name: 'Sắc',
    },
    {
        type: 'sung',
        name: 'Sủng',
    },
    {
        type: 'tham-hiem',
        name: 'Thám Hiểm',
    },
    {
        type: 'tien-hiep',
        name: 'Tiên Hiệp',
    },
    {
        type: 'trinh-tham',
        name: 'Trinh Thám',
    },
    {
        type: 'trong-sinh',
        name: 'Trọng Sinh',
    },
    {
        type: 'truyen-teen',
        name: 'Truyện Teen',
    },
    {
        type: 'viet-nam',
        name: 'Việt Nam',
    },
    {
        type: 'vong-du',
        name: 'Võng Du',
    },
    {
        type: 'xuyen-khong',
        name: 'Xuyên Không',
    },
    {
        type: 'xuyen-nhanh',
        name: 'Xuyên Nhanh',
    },
];
export const getCategoryByName = (type: string): string | null => {
    console.log(ECategoryType);
    let result = ECategoryType.find((e) => e.type == type);
    return result ? result.name : null;
};
