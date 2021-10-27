import React, {useState} from 'react'
import { View } from 'react-native'
import { Input, CheckBox, Text, Button } from 'react-native-elements' 
import { ScrollView } from 'react-native-gesture-handler'

const FormEvent = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [fee, setFee] = useState('')
    //date
    const [isPublic, setIsPublic] = useState('')
    const [isPrivate, setIsPrivate] = useState('')

    
    return (
//titulo -description - $fee - date - isPublic - location = {lat, long} - attachments - createdAt
        
        <View>
            <ScrollView>
            <Input label="Titulo" placeholder="Titulo del evento..."/>
            <Input label="Descripción" placeholder="Descripcion ..."/>
            <Input label="Tarifa" placeholder="Evento fee..."/>
            <Input label="Fecha" placeholder="Evento date..."/>
            <Text h4>Tipo de evento</Text>
            <CheckBox title="Publico"/>
            <CheckBox title="Privado"/>

            {/* <Input label="Ubicacion" placeholder="Evento location..."/> */}
            <Input label="Fotos" placeholder="Añadir link de la foto..."/>
            {/*createdAt*/}
            <Button title="Crear Evento" />
            </ScrollView>

        </View>
    )
}

export default FormEvent
