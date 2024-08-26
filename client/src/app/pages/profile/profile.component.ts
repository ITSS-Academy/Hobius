import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  model,
  signal,
  ViewChild,
} from '@angular/core';

import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfileFormDialogComponent } from './components/edit-profile-form-dialog/edit-profile-form-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserModel } from '../../../models/user.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule, SharedModule, NgStyle],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements AfterViewInit {
  user: UserModel = {
    id: '1',
    userName: 'Gia Huy',
    email: 'dhghuy@gmail.com',
    avatarURL: '../public/assets/profile_pictures/img_7.png',
    wallPaperURL:
      'data:image/jpeg;base64,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',
    joinedDate: 'N/A',
  };

  @ViewChild('myBackground') background?: ElementRef;

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

  ngAfterViewInit() {
    if (this.background) {
      this.background.nativeElement.style.backgroundImage = `url(${this.user.wallPaperURL})`;
    }
  }

  removeBookCard(index: number) {
    const [removed] = this.bookCard.splice(index, 1);

    this._snackBar.open('Đã bỏ theo dõi', 'Đóng', {
      duration: 1000,
      panelClass: ['snackbar'],
    });
  }

  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(EditProfileFormDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
