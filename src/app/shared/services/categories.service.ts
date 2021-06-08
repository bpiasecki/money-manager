import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Endpoints } from '@core/db/endpoints.enum';
import { CategoryItem } from '@core/models/categories/categoryItem.model';
import { CategoryType } from '@core/models/categories/categoryType.model';
import { AuthService } from '@core/services/auth.service';
import { BaseDbService } from '@core/services/baseDb.service';

@Injectable()
export class CategoriesService extends BaseDbService<CategoryItem> {


    constructor(protected db: AngularFireDatabase, authService: AuthService) {
        super(Endpoints.Categories, authService, db);
    }


    //insert initial categories right after user registration process
    public insertInitialValues() {
        const initialCategories = this.getInitialList();
        this.db.object(`${this.userId}/${this.endpoint}`).set(initialCategories).then(() => console.log('initial categories inserted'))
    }

    private getInitialList(): Record<string, CategoryItem> {
        const items: Record<string, CategoryItem> = {};

        const categoryGroup1 = this.db.createPushId();
        items[categoryGroup1] = new CategoryItem('Przychody', null, 'trending_up', CategoryType.Income);
        items[this.db.createPushId()] = new CategoryItem('Wynagrodzenie', categoryGroup1, null, CategoryType.Income);
        items[this.db.createPushId()] = new CategoryItem('Premia', categoryGroup1, null, CategoryType.Income);
        items[this.db.createPushId()] = new CategoryItem('Odsetki bankowe', categoryGroup1, null, CategoryType.Income);
        items[this.db.createPushId()] = new CategoryItem('Sprzedaż', categoryGroup1, null, CategoryType.Income);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup1, null, CategoryType.Income);

        const categoryGroup2 = this.db.createPushId();
        items[categoryGroup2] = new CategoryItem('Dom', null, 'home');
        items[this.db.createPushId()] = new CategoryItem('Czynsz', categoryGroup2);
        items[this.db.createPushId()] = new CategoryItem('Woda', categoryGroup2);
        items[this.db.createPushId()] = new CategoryItem('Prąd', categoryGroup2);
        items[this.db.createPushId()] = new CategoryItem('Gaz', categoryGroup2);
        items[this.db.createPushId()] = new CategoryItem('Ogrzewanie', categoryGroup2);
        items[this.db.createPushId()] = new CategoryItem('Wywóz śmieci', categoryGroup2);
        items[this.db.createPushId()] = new CategoryItem('Konserwacja i naprawy', categoryGroup2);
        items[this.db.createPushId()] = new CategoryItem('Wyposażenie', categoryGroup2);
        items[this.db.createPushId()] = new CategoryItem('Ubezpieczenie nieruchomości', categoryGroup2);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup2);

        const categoryGroup3 = this.db.createPushId();
        items[categoryGroup3] = new CategoryItem('Jedzenie', null, 'restaurant');
        items[this.db.createPushId()] = new CategoryItem('Jedzenie dom', categoryGroup3);
        items[this.db.createPushId()] = new CategoryItem('Jedzenie miasto', categoryGroup3);
        items[this.db.createPushId()] = new CategoryItem('Jedzenie praca', categoryGroup3);
        items[this.db.createPushId()] = new CategoryItem('Alkohol', categoryGroup3);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup3);

        const categoryGroup4 = this.db.createPushId();
        items[categoryGroup4] = new CategoryItem('Transport', null, 'commute');
        items[this.db.createPushId()] = new CategoryItem('Paliwo do auta', categoryGroup4);
        items[this.db.createPushId()] = new CategoryItem('Przeglądy i naprawy auta', categoryGroup4);
        items[this.db.createPushId()] = new CategoryItem('Wyposażenie dodatkowe auta', categoryGroup4);
        items[this.db.createPushId()] = new CategoryItem('Ubezpieczenie auta', categoryGroup4);
        items[this.db.createPushId()] = new CategoryItem('Bilet komunikacji miejskiej', categoryGroup4);
        items[this.db.createPushId()] = new CategoryItem('Bilet PKP, PKS', categoryGroup4);
        items[this.db.createPushId()] = new CategoryItem('Taxi', categoryGroup4);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup4);

        const categoryGroup5 = this.db.createPushId();
        items[categoryGroup5] = new CategoryItem('Internet/TV', null, 'settings_input_antenna');
        items[this.db.createPushId()] = new CategoryItem('Telefon', categoryGroup5);
        items[this.db.createPushId()] = new CategoryItem('TV', categoryGroup5);
        items[this.db.createPushId()] = new CategoryItem('Subskrypcje', categoryGroup5);
        items[this.db.createPushId()] = new CategoryItem('Internet', categoryGroup5);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup5);

        const categoryGroup6 = this.db.createPushId();
        items[categoryGroup6] = new CategoryItem('Zdrowie', null, 'health_and_safety');
        items[this.db.createPushId()] = new CategoryItem('Lekarz', categoryGroup6);
        items[this.db.createPushId()] = new CategoryItem('Badania', categoryGroup6);
        items[this.db.createPushId()] = new CategoryItem('Lekarstwa', categoryGroup6);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup6);

        const categoryGroup7 = this.db.createPushId();
        items[categoryGroup7] = new CategoryItem('Ubrania', null, 'checkroom');
        items[this.db.createPushId()] = new CategoryItem('Ubranie zwykłe', categoryGroup7);
        items[this.db.createPushId()] = new CategoryItem('Ubranie sportowe', categoryGroup7);
        items[this.db.createPushId()] = new CategoryItem('Buty', categoryGroup7);
        items[this.db.createPushId()] = new CategoryItem('Dodatki', categoryGroup7);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup7);

        const categoryGroup8 = this.db.createPushId();
        items[categoryGroup8] = new CategoryItem('Higiena', null, 'wash');
        items[this.db.createPushId()] = new CategoryItem('Kosmetyki', categoryGroup8);
        items[this.db.createPushId()] = new CategoryItem('Środki czystości', categoryGroup8);
        items[this.db.createPushId()] = new CategoryItem('Fryzjer', categoryGroup8);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup8);

        const categoryGroup9 = this.db.createPushId();
        items[categoryGroup9] = new CategoryItem('Dzieci', null, 'child_care');
        items[this.db.createPushId()] = new CategoryItem('Artykuły szkolne', categoryGroup9);
        items[this.db.createPushId()] = new CategoryItem('Dodatkowe zajęcia', categoryGroup9);
        items[this.db.createPushId()] = new CategoryItem('Wpłaty na szkołę itp.', categoryGroup9);
        items[this.db.createPushId()] = new CategoryItem('Zabawki / gry', categoryGroup9);
        items[this.db.createPushId()] = new CategoryItem('Opieka nad dziećmi', categoryGroup9);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup9);

        const categoryGroup10 = this.db.createPushId();
        items[categoryGroup10] = new CategoryItem('Zwierzęta', null, 'pets');
        items[this.db.createPushId()] = new CategoryItem('Jedzenie', categoryGroup10);
        items[this.db.createPushId()] = new CategoryItem('Sprzątanie', categoryGroup10);
        items[this.db.createPushId()] = new CategoryItem('Weterynarz', categoryGroup10);
        items[this.db.createPushId()] = new CategoryItem('Pielęgnacja', categoryGroup10);
        items[this.db.createPushId()] = new CategoryItem('Akcesoria', categoryGroup10);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup10);

        const categoryGroup11 = this.db.createPushId();
        items[categoryGroup11] = new CategoryItem('Rozrywka', null, 'theaters');
        items[this.db.createPushId()] = new CategoryItem('Siłownia / Basen', categoryGroup11);
        items[this.db.createPushId()] = new CategoryItem('Kino / Teatr', categoryGroup11);
        items[this.db.createPushId()] = new CategoryItem('Koncerty', categoryGroup11);
        items[this.db.createPushId()] = new CategoryItem('Czasopisma', categoryGroup11);
        items[this.db.createPushId()] = new CategoryItem('Książki', categoryGroup11);
        items[this.db.createPushId()] = new CategoryItem('Hobby', categoryGroup11);
        items[this.db.createPushId()] = new CategoryItem('Hotel / Turystyka', categoryGroup11);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup11);

        const categoryGroup12 = this.db.createPushId();
        items[categoryGroup12] = new CategoryItem('Spłata długów', null, 'payments');
        items[this.db.createPushId()] = new CategoryItem('Kredyt hipoteczny', categoryGroup12);
        items[this.db.createPushId()] = new CategoryItem('Kredyt konsumpcyjny', categoryGroup12);
        items[this.db.createPushId()] = new CategoryItem('Pożyczka osobista', categoryGroup12);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup12);

        const categoryGroup13 = this.db.createPushId();
        items[categoryGroup13] = new CategoryItem('Oszczędności', null, 'savings');
        items[this.db.createPushId()] = new CategoryItem('Fundusz awaryjny', categoryGroup13);
        items[this.db.createPushId()] = new CategoryItem('Fundusz wydatków nieregularnych', categoryGroup13);
        items[this.db.createPushId()] = new CategoryItem('Poduszka finansowa', categoryGroup13);
        items[this.db.createPushId()] = new CategoryItem('Konto emerytalne', categoryGroup13);
        items[this.db.createPushId()] = new CategoryItem('Nadpłata długów', categoryGroup13);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup13);
        
        const categoryGroup14 = this.db.createPushId();
        items[categoryGroup14] = new CategoryItem('Inne', null, 'payment');
        items[this.db.createPushId()] = new CategoryItem('Dobroczynność', categoryGroup14);
        items[this.db.createPushId()] = new CategoryItem('Prezenty', categoryGroup14);
        items[this.db.createPushId()] = new CategoryItem('Sprzęt RTV', categoryGroup14);
        items[this.db.createPushId()] = new CategoryItem('Oprogramowanie', categoryGroup14);
        items[this.db.createPushId()] = new CategoryItem('Edukacja / Szkolenia', categoryGroup14);
        items[this.db.createPushId()] = new CategoryItem('Usługi inne', categoryGroup14);
        items[this.db.createPushId()] = new CategoryItem('Podatki / mandaty', categoryGroup14);
        items[this.db.createPushId()] = new CategoryItem('Inne', categoryGroup14);

        return items;
    }
}
