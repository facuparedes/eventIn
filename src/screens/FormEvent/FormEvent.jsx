import React, {useState} from 'react'
import { View } from 'react-native'
import { Input, CheckBox, Text, Button } from 'react-native-elements' 
import { ScrollView } from 'react-native-gesture-handler'

const FormEvent = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [fee, setFee] = useState(0)
    //date
    const [isPublic, setIsPublic] = useState(false)
    const [isPrivate, setIsPrivate] = useState(false)
    // HANDELS FUNCTIONS
    const handleTitle = (text) => {
        setTitle(text)
    }
    const handleDescription = (text) => {
        setDescription(text)
    }
    const handleFee = (value) => {
        setFee(value)
    }
    const handleIsPublic = () => {
        setIsPublic(!isPublic)
        console.log(isPublic)
    }
    const handleIsPrivate = () => {
        setIsPrivate(!isPrivate)
    }
    return (
//titulo -description - $fee - date - isPublic - location = {lat, long} - attachments - createdAt
        
        <View>
            <ScrollView>
            <Input 
                label="Titulo" 
                placeholder="Titulo del evento..." 
                onChangeText={text => handleTitle(text)}/>
            <Input 
                label="Descripción" 
                placeholder="Descripcion ..."
                onChange={handleDescription}/>

            <Input label="Tarifa" placeholder="Tarifa..."/>


            <Input label="Fecha del evento" placeholder="Evento date..."/>
            <Text h4>Tipo de evento</Text>
            <View>
                <CheckBox title="Publico" onPress={handleIsPublic}/>
                <CheckBox title="Privado" onPress={handleIsPrivate}/>
            </View>
            {/* <Input label="Ubicacion" placeholder="Evento location..."/> */}
            <Input label="Fotos" placeholder="Añadir link de la foto..."/>
            {/*createdAt*/}
            <Button title="Crear Evento" />
            </ScrollView>

        </View>
    )
}

export default FormEvent
