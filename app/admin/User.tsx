interface User {
    id: number;
    name: string;
    firstSurname: string;
    secondSurname?: string;
    email: string;
    phone: string;
}


interface UserProps {
    user: User

}

const User: React.FC<UserProps> = ({user}) => {
    const handleButton = async () => {
        const userId = user.id;

        const response = await fetch(`api/users/${userId}`, {
            method: "DELETE"
        })

        if (response.ok) {
            console.log("eliminado correctamente")
        }
    }

    return(
        <div>
            Nombre: {user.name}
            Apellido 1: {user.firstSurname},
            Apellido 2: {user.secondSurname ? user.secondSurname : 'No tiene'}
            Email: {user.email}
            Telefono: {user.phone}
            <button onClick={() => handleButton()}>Eliminar</button>
        </div>
    );
}

export default User;