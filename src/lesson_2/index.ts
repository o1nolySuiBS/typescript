// // class UserService{
// //     static greeting():void{
// //         console.log('Hello');
// //     }
// // }
// //
// // UserService.greeting()
//
// interface IUserForm {
//     name: string;
//     age: number
// }
//
// interface IUser extends IUserForm {
//     id: number;
// }
//
//
// class UserService {
//     private static readonly _userKey = 'users'
//
//     private static _getAll(): IUser[] {
//         return JSON.parse(localStorage.getItem(this._userKey)) || []
//     }
//
//
//     static create(data: IUserForm): void {
//         const users = this._getAll();
//         const id = users.length ? users.slice(-1)[0].id + 1 : 1;
//         users.push({id, ...data})
//         this._setToStorage(users)
//         ///ddddd
//     }
//
//     static showHtml(): void {
//         const userContainer = document.querySelector('#userContainer') as HTMLDivElement
//         userContainer.innerHTML = ''
//         const users = this._getAll();
//
//         const usersHtmlContent = users.map(user => {
//             const itemDiv = document.createElement('div');
//             const button = document.createElement('button');
//             button.innerText = 'delete'
//             button.onclick =()=>{
//                 this._deleteById(user.id)
//             }
//             itemDiv.innerText = `${user.id} -- ${user.name} -- ${user.age}`
//             itemDiv.appendChild(button)
//             return itemDiv
//         });
//
//         if (usersHtmlContent.length) {
//             userContainer.append(...usersHtmlContent)
//         } else {
//             userContainer.innerText = 'Users not exists'
//         }
//     }
//
//     private static _setToStorage(data: IUser[]): void {
//         localStorage.setItem(this._userKey, JSON.stringify(data))
//         this.showHtml()
//     }
//
//     private static _deleteById(id:number):void{
//         const users = this._getAll();
//         const index = users.findIndex(user=>user.id === id);
//         users.splice(index,1)
//         this._setToStorage(users)
//     }
// }
//
// UserService.showHtml()
//
// const form = document.forms['userForm'] as HTMLFormElement;
//
// interface IInput {
//     name: HTMLInputElement;
//     age: HTMLInputElement;
// }
//
// form.onsubmit = (e: SubmitEvent) => {
//     e.preventDefault()
//     const {name: nameInput, age: ageInput} = form as any as IInput;
//     UserService.create({name: nameInput.value, age: +ageInput.value})
//     form.reset()
// }
//---------------------------------------------------------------------------------------------------------------------------------
// Інтерфейс, що визначає структуру даних форми користувача
interface IUserForm {
    name: string;
    age: number;
}

// Інтерфейс, що розширює IUserForm додатковою властивістю id
interface IUser extends IUserForm {
    id: number;
}

// Клас, відповідальний за операції, пов'язані з користувачами
class UserService {
    // Приватна статична константа для зберігання ключа, який використовується у localStorage
    private static readonly _userKey = 'users';

    // Приватний статичний метод для отримання всіх користувачів із localStorage
    private static _getAll(): IUser[] {
        // Розбирає JSON-рядок із localStorage і повертає масив користувачів,
        // або повертає порожній масив, якщо користувачів не знайдено
        return JSON.parse(localStorage.getItem(this._userKey)) || [];
    }

    // Статичний метод для створення нового користувача
    static create(data: IUserForm): void {
        // Отримує всіх існуючих користувачів
        const users = this._getAll();
        // Визначає id нового користувача на основі id останнього користувача
        const id = users.length ? users.slice(-1)[0].id + 1 : 1;
        // Додає нового користувача до масиву користувачів
        users.push({ id, ...data });
        // Зберігає оновлений масив користувачів у localStorage
        this._setToStorage(users);
    }

    // Статичний метод для відображення всіх користувачів в HTML
    static showHtml(): void {
        // Отримує елемент контейнера користувачів
        const userContainer = document.querySelector('#userContainer') as HTMLDivElement;
        userContainer.innerHTML = '';
        // Отримує всіх існуючих користувачів
        const users = this._getAll();

        // Створює HTML-контент для кожного користувача
        const usersHtmlContent = users.map(user => {
            const itemDiv = document.createElement('div');
            const button = document.createElement('button');
            button.innerText = 'delete';
            // Додає обробник події кліку до кнопки видалення користувача
            button.onclick = () => {
                this._deleteById(user.id);
            };
            // Встановлює текстовий контент div для відображення деталей користувача
            itemDiv.innerText = `${user.id} -- ${user.name} -- ${user.age}`;
            // Додає кнопку видалення до div
            itemDiv.appendChild(button);
            return itemDiv;
        });

        // Додає HTML-контент користувачів до контейнера користувачів або відображає повідомлення, якщо користувачів не існує
        if (usersHtmlContent.length) {
            userContainer.append(...usersHtmlContent);
        } else {
            userContainer.innerText = 'Users not exists';
        }
    }

    // Приватний статичний метод для збереження масиву користувачів у localStorage
    private static _setToStorage(data: IUser[]): void {
        localStorage.setItem(this._userKey, JSON.stringify(data));
        // Оновлює HTML для відображення змін
        this.showHtml();
    }

    // Приватний статичний метод для видалення користувача за його id
    private static _deleteById(id: number): void {
        // Отримує всіх існуючих користувачів
        const users = this._getAll();
        // Знаходить індекс користувача, якого треба видалити
        const index = users.findIndex(user => user.id === id);
        // Видаляє користувача з масиву
        users.splice(index, 1);
        // Зберігає оновлений масив користувачів у localStorage
        this._setToStorage(users);
    }
}

// Відображає початковий список користувачів при завантаженні сторінки
UserService.showHtml();

// Отримує елемент форми користувача
const form = document.forms['userForm'] as HTMLFormElement;

// Інтерфейс для елементів введення у формі користувача
interface IInput {
    name: HTMLInputElement;
    age: HTMLInputElement;
}

// Обробляє відправку форми
form.onsubmit = (e: SubmitEvent) => {
    // Запобігає стандартній поведінці відправки форми
    e.preventDefault();
    // Отримує елементи введення імені та віку з форми
    const { name: nameInput, age: ageInput } = form as any as IInput;
    // Створює нового користувача з введеними значеннями
    UserService.create({ name: nameInput.value, age: +ageInput.value });
    // Скидає форму
    form.reset();
};
