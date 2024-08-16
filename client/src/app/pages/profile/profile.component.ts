import { Component } from '@angular/core';

import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  bookCard: any[] = [
    {
      id: 1,
      title: 'Đợi Tới Khi Ve Xanh Rụng',
      img: '../public/assets/profile_pictures/img.png',
      author: 'Đinh Mặc',
      year: 'N/A',
      summary:
        'Bảy năm trước vào một đêm khuya, cảnh sát hình sự Lý Cẩn Thành mất tích bí ẩn tại làng đô thị...',
    },
    {
      id: 2,
      title: 'Lên Nhầm Kiệu Hoa',
      img: '../public/assets/profile_pictures/img_1.png',
      author: 'Lục Dược',
      year: 'N/A',
      summary:
        'Hết làm cha rồi đến làm mẹ, làm xong sư phụ rồi lại đến làm trượng phu...',
    },
    {
      id: 3,
      title: 'Anh Trai Nhân Vật Chính',
      img: '../public/assets/profile_pictures/img_2.png',
      author: 'Tiên Sắc Xám',
      year: 'N/A',
      summary:
        'Ở kiếp này, Khan là anh trai nhân vật chính nhưng số mệnh của hắn lại không may mắn hưởng ké được miếng hào quang nào của cậu ta.' +
        ' Khan lấy lại được ký ức tiền kiếp mình trong hoàn cảnh hoàn toàn bất lợi. Hắn nhận ra mình chỉ là một nhân vật phụ, một nhân vật phản diện bé nhỏ trong bộ tiểu thuyết dài kỳ được viết bởi nhỏ em gái của mình ở kiếp trước viết ra...',
    },
    {
      id: 4,
      title: 'Bắc Phái Đạo Mộ Bút Ký',
      img: '../public/assets/profile_pictures/img_3.png',
      author: 'Vân Phong',
      year: 'N/A',
      summary:
        'Tôi là một đứa trẻ nghèo đến từ một ngôi làng miền núi ở Đông Bắc Trung Quốc, vào đầu thế kỷ 20, ...',
    },
    {
      id: 5,
      title: 'Chí Tôn Kiếm Đế',
      img: '../public/assets/profile_pictures/img_4.png',
      author: 'Lâm Nhất',
      year: 'N/A',
      summary: 'Diệp Thanh là thế tử Diệp gia, vừa có tài, lại có thân phận...',
    },
    {
      id: 6,
      title: 'Tướng Quân Tại Thượng',
      img: '../public/assets/profile_pictures/img_5.png',
      author: 'Trúc Lâm Thâm Xứ',
      year: 'N/A',
      summary:
        'Một giấc tỉnh dậy, ta thấy mình nằm trên giường của kẻ thù. Hắn áo quần xộc xệch, đầy dấu vết đỏ, khoé mắt và chân mày đều mang vẻ mờ ám...',
    },
    {
      id: 7,
      title: '430 Triệu Năm Của Cô Ấy',
      img: '../public/assets/profile_pictures/img_6.png',
      author: 'Quân Tử Dĩ Trạch',
      year: 'N/A',
      summary:
        'Vào sinh nhật 18 tuổi, Lê Tử được cha mình nói: “Thực ra mẹ con có gen không phải người…”...',
    },
  ];

  cmtCard: any[] = [
    {
      id: 1,
      title: 'Đợi Tới Khi Ve Xanh Rụng',
      img: '../public/assets/profile_pictures/img.png',
      time: '1 giờ trước',
      content: 'Truyện hay, nhưng kết thúc hơi vội',
    },
    {
      id: 2,
      title: 'Lên Nhầm Kiệu Hoa',
      img: '../public/assets/profile_pictures/img_1.png',
      time: '2 giờ trước',
      content: 'Truyện rất hay, ra nhanh di',
    },
    {
      id: 3,
      title: 'Anh Trai Nhân Vật Chính',
      img: '../public/assets/profile_pictures/img_2.png',
      time: '3 giờ trước',
      content: 'Truyện rất giả tưởng, nhưng rất hay',
    },
    {
      id: 4,
      title: 'Bắc Phái Đạo Mộ Bút Ký',
      img: '../public/assets/profile_pictures/img_3.png',
      time: '4 giờ trước',
      content: 'Truyện rất thú vị, nhưng hơi dài',
    },
    {
      id: 5,
      title: 'Chí Tôn Kiếm Đế',
      img: '../public/assets/profile_pictures/img_4.png',
      time: '5 giờ trước',
      content: 'Truyện rất hai`, nhưng kết thúc hơi tệ',
    },
    {
      id: 6,
      title: 'Tướng Quân Tại Thượng',
      img: '../public/assets/profile_pictures/img_5.png',
      time: '6 giờ trước',
      content: 'Truyện ra nhanh lắm, nhưng hơi ngắn',
    },
    {
      id: 7,
      title: '430 Triệu Năm Của Cô Ấy',
      img: '../public/assets/profile_pictures/img_6.png',
      time: '7 giờ trước',
      content: 'Truyện rất mơ mộng, nhưng hơi tiêu cực',
    },
  ];

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.open('Đã bỏ theo dõi', 'Đóng', {
      duration: 1000,
      panelClass: ['snackbar'],
    });
  }

  removeBookCard(index: number) {
    const [removed] = this.bookCard.splice(index, 1);
  }
}
