import { Alert, Linking } from 'react-native';

import Geolocation from 'react-native-geolocation-service';

export const getNameParts = (fullName, firstandLast = false) => {
    if (typeof fullName === 'string') {
        let nameParts = fullName.split(" ");
        let length = nameParts.length;

        if (firstandLast && length > 1) {
            return `${nameParts[0]} ${nameParts[length-1]}`;
        }
        else {
            return nameParts[0];
        }
    }
}

export const getInitials = (string) => {
    if (typeof string === 'string'){
        let names = string.split(" ")
        initials = names[0].substring(0, 1).toUpperCase()
    
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase()
    }
    return initials
    } else {
        return null
    }
};

export const handleAvatar = (image) => {
    const source = { uri: image }
    
    if (image && image !== 'default') {
        return source
    }
    else {
        return null
    }
}

export const handleAsyncAvatar = (image) => {
    const source = 'default'

    if (image) {
        return image
    }
    else {
        return source
    }
}

export const Redirect = (titulo, message, url) => {
    Alert.alert(
        `${titulo}`,
        `${message}`,
        [
            { text: "Cancelar", style: 'cancel' },
            { text: "Ok", onPress: () => Linking.openURL(`${url}`) }
        ]
    )
}

export const userLocation = () => {
    Geolocation.getCurrentPosition(
        (position) => {
            this.setState({
                userLatitude: position.coords.latitude,
                userLongitude: position.coords.longitude,
                error: null,
            });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 50000 },
    );
}
