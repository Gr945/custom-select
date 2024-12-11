export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    job?: string;
};

export type Response = {
    data: User[];
    meta: {
        from: number; // порядковый номер первого возвращаемого элемента
        to: number;   // порядковый номер последнего возвращаемого элемента
        total: number; // общее количество данных
    };
};