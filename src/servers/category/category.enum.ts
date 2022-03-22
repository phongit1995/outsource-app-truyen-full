import { log } from 'console';
import { type } from 'os';

type CategoryType = {
    type: string;
    title: string;
    name: string;
};
export const ECategoryType: CategoryType[] = [
    {
        type: 'bach-hop',
        title: 'Truyện tình cảm giữa nữ và nữ.',
        name: 'Bách Hợp',
    },
    {
        type: 'co-dai',
        title: 'Truyện có nội dung xảy ra ở thời cổ đại phong kiến.',
        name: 'Cổ Đại',
    },
    {
        type: 'cung-dau',
        title: 'Truyện cung đấu là thể loại truyện có các nhân vật trong hoàng cung thời phong kiến đấu đá, âm mưu tính toán lẫn nhau.',
        name: 'Cung Đấu',
    },
    {
        type: 'di-gioi',
        title: 'Trong truyện có xuất hiện những thế giới kỳ dị, khác với thế giới chúng ta đang sinh sống.',
        name: 'Dị Giới',
    },
    {
        type: 'di-nang',
        title: 'Truyện dị năng là thể loại thường có những nhân vật sở hữu các năng lực siêu nhiên đặc biệt mà người thường không thể nào có được.',
        name: 'Dị Năng',
    },
    {
        type: 'dien-van',
        title: 'Điền văn, chủng điền văn là thể loại truyện cho những bạn thích những câu chuyện nhẹ nhàng, đơn giản.',
        name: 'Điền Văn',
    },
    {
        type: 'do-thi',
        title: 'Những truyện có nội dung chủ yếu diễn ra trong môi trường đô thị hiện đại.',
        name: 'Đô Thị',
    },
    {
        type: 'doan-van',
        title: 'Truyện đoản văn là những truyện có nội dung ngắn, thưởng chỉ có một đến vài chương.',
        name: 'Đoản Văn',
    },
    {
        type: 'dong-phuong',
        title: 'Là những truyện có nội dung xảy ra ở các nước phương Đông.',
        name: 'Đông Phương',
    },
    {
        type: 'gia-dau',
        title: 'Gia đấu cũng như trạch đấu là thể loại truyện có các tình tiết đấu đá, mưu tính nhau giữa các thành viên trong gia đình hoặc dòng họ.',
        name: 'Gia Đấu',
    },
    {
        type: 'hai-huoc',
        title: 'Những bộ truyện có nội dung hài hước, đem lại tiếng cười vui vẻ cho độc giả.',
        name: 'Hài Hước',
    },
    {
        type: 'he-thong',
        title: 'Truyện hệ thống là truyện thường có nhân vật chính mang trong người một hệ thống. Hệ thống này thường cộng sinh với nhân vật chính, nhờ hoàn thành nhiệm vụ/yêu cầu thông qua nó, nhân vật chính có thể đạt được nhiều lợi ích.',
        name: 'Hệ Thống',
    },
    {
        type: 'huyen-huyen',
        title: 'Truyện có những yếu tố huyền bí, khoa học khó giải thích.',
        name: 'Huyền Huyễn',
    },
    {
        type: 'khac',
        title: 'Những truyện không thuộc những thể loại đã có ở BlogEma sẽ được cho vào đây ^^!',
        name: 'Khác',
    },
    {
        type: 'khoa-huyen',
        title: 'Những bộ truyện có yếu tố khoa học bí ẩn.',
        name: 'Khoa Huyễn',
    },
    {
        type: 'kiem-hiep',
        title: 'Truyện thường xoay quanh cuộc đời của nhân vật chính, quá trình rèn luyện, trưởng thành, tìm kiếm, học tập các bí kíp võ công, cùng những cuộc phiêu lưu, truy đuổi, chém giết... đầy nguy hiểm và cơ hội trong giới võ lâm giang hồ.',
        name: 'Kiếm Hiệp',
    },
    {
        type: 'lich-su',
        title: 'Nội dung truyện thường xảy ra trong lịch sử, có nhiều yếu tố tương tự so với lịch sử thế giới thật.',
        name: 'Lịch Sử',
    },
    {
        type: 'light-novel',
        title: 'Light Novel là một dạng tiểu thuyết Nhật Bản được viết nhằm chủ yếu hướng đến các độc giả trẻ như học sinh trung học. Dạng tiểu thuyết đang lan rộng và được giới tác giả cũng như độc giả trên thế giới đón nhận nồng nhiệt.',
        name: 'Light Novel',
    },
    {
        type: 'linh-di',
        title: 'Truyện có nhiều yếu tố ma quỷ rùng rợn, kinh dị.',
        name: 'Linh Dị',
    },
    {
        type: 'mat-the',
        title: 'Là truyện có bối cảnh tận thế, thế giới bị sụp đổ và diệt vong vì những thảm họa.',
        name: 'Mạt Thế',
    },
    {
        type: 'ngon-tinh',
        title: 'Truyện thuộc kiểu lãng mạn, kể về những sự kiện vui buồn trong tình yêu của nhân vật chính.',
        name: 'Ngôn Tình',
    },
    {
        type: 'nguoc',
        title: 'Truyện ngược là thể loại truyện có những tình tiết khiến người xem xúc động mạnh, thường là tức giận, luyến tiếc thậm chí là ức chế thay cho nhân vật, khi mà họ bị hành hạ về mặt thể xác hoặc tinh thần.',
        name: 'Ngược',
    },
    {
        type: 'nu-cuong',
        title: 'Truyện nữ cường là thể loại truyện có những nhân vật nữ sở hữu tính cánh mạnh mẽ (có khi hơn cả đàn ông).',
        name: 'Nữ Cường',
    },
    {
        type: 'nu-phu',
        title: 'Truyện kể về nhân vật chính là... nữ phụ trong các tiểu thuyết.',
        name: 'Nữ Phụ',
    },
    {
        type: 'phuong-tay',
        title: 'Những tác phẩm được viết bởi các tác giả phương Tây.',
        name: 'Phương Tây',
    },
    {
        type: 'quan-su',
        title: 'Truyện có yếu tố quân sự, thường diễn ra trong môi trường quân đội, quân lính.',
        name: 'Quân Sự',
    },
    {
        type: 'quan-truong',
        title: 'Là truyện kể về những khía cạnh cũng như quá trình thăng quan tiến chức của nhân vật chính trong chính trường.',
        name: 'Quan Trường',
    },
    {
        type: 'sac',
        title: 'Những bộ truyện này thường có yếu nhạy cảm, cân nhắc trước khi xem.',
        name: 'Sắc',
    },
    {
        type: 'sung',
        title: 'Ngược với truyện ngược, truyện sủng là thể loại truyện khiến người đọc có cảm giác ngọt ngào vui vẻ, nơi mà nhân vật chính được nửa kia của mình quan tâm và cưng chiều hết mình.',
        name: 'Sủng',
    },
    {
        type: 'tham-hiem',
        title: 'Nội dung truyện thường là những cuộc phiêu lưu thám hiểm những địa danh kỳ bí cực gay cấn.',
        name: 'Thám Hiểm',
    },
    {
        type: 'tien-hiep',
        title: 'Danh sách truyện Tiên Hiệp, truyện Tu Tiên, Tu Chân cực hay, đầy đủ nhất - Truyện Tiên Hiệp thường kể về quá trình tu luyện và khám phá thế giới tu sĩ thần tiên đầy bí ẩn của nhân vật chính.',
        name: 'Tiên Hiệp',
    },
    {
        type: 'trinh-tham',
        title: '',
        name: 'Trinh Thám',
    },
    {
        type: 'trong-sinh',
        title: 'Đây là thể truyện có nhân vật chính vì một lý do nào đó mà được sống lại sau khi chết đi, thể loại này thường kết hợp với thể loại xuyên không.',
        name: 'Trọng Sinh',
    },
    {
        type: 'truyen-teen',
        title: 'Truyện teen là thể loại truyện được viết dành riêng cho lứa tuổi thanh thiếu niên mới lớn, tâm hồn đầy hồn nhiên và mộng mơ. Truyện thường tả về các mỗi tình tuổi học trò đầy hồn nhiên và tươi sáng.',
        name: 'Truyện Teen',
    },
    {
        type: 'viet-nam',
        title: 'Các tác phẩm của nền văn học Việt Nam, được viết bởi các danh tác nổi tiếng.',
        name: 'Việt Nam',
    },
    {
        type: 'vong-du',
        title: 'Là thể loại truyện thuộc dạng khoa học viễn tượng, lấy bối cảnh thường là các game online trên mạng với công nghệ cao, hình ảnh chất lượng cao, kỹ xảo đồ sộ, mức chân thật cao, kỳ ảo, và tác giả của thể loại này thường rất giàu trí tưởng tượng.',
        name: 'Võng Du',
    },
    {
        type: 'xuyen-khong',
        title:
            'Xuyên Không, Xuyên Việt là thể loại nhân vật chính vì một lý do nào đó mà bị đưa đến sinh sống ở một không gian hay một khoảng thời gian khác.' +
            'Nhân vật chính có thể trực tiếp xuyên qua bằng thân xác mình hoặc sống lại bằng thân xác người khác.',
        name: 'Xuyên Không',
    },
    {
        type: 'xuyen-nhanh',
        title: 'Truyện xuyên nhanh, mau xuyên, hay còn gọi là khoái xuyên, thường nói về những cuộc phiêu lưu xuyên qua nhiều thế giới một cách liên tục của nhân vật chính.',
        name: 'Xuyên Nhanh',
    },
];
export const getCategoryByName = (type: string): string | null => {
    let result = ECategoryType.find((e) => e.type == type);
    return result ? result.name : null;
};

export const getTitleByCategory = (type: string): string | null => {
    let result = ECategoryType.find((d) => d.type == type);
    return result ? result.title : null;
};
