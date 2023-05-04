import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity } from 'react-native';

import i18n from '../locales';
import BusStopButton from '../components/BusStopButton';

export default function HomeScreen({ navigation }) {
    const [_, setLocale] = useState(i18n.locale);
    const changeLocale = locale => {
        i18n.locale = locale;
        setLocale(locale);
    };
    const locales = [
        { text: "EN", locale: "en" },
        { text: "繁", locale: "zh-TW" },
        { text: "简", locale: "zh-CN" },
    ].filter(({ locale }) => i18n.locale != locale);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.image}
                blurRadius={5}
                source={require('../public/backgroundImage.jpeg')} />

            <View style={styles.groupContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {i18n.t("appTitle")}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <BusStopButton navigation={navigation} />
                </View>

                <View style={styles.languages}>
                    {
                        locales.map(({ locale, text }) => (
                            <TouchableOpacity key={locale}
                                onPress={() => changeLocale(locale)}>
                                <Text style={styles.language}>
                                    {text}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        position: 'relative',
        backgroundColor: 'white'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    groupContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        backgroundColor: 'rgba(255, 255, 255, .3)'
    },
    titleContainer: {
        width: '70%',
        marginTop: '50%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        letterSpacing: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    formContainer: {
        alignSelf: 'center',
        width: '70%',
        marginTop: '20%'
    },
    languages: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "center",
    },
    language: {
        marginHorizontal: 10,
        color: "white",
        fontSize: 16,
        lineHeight: 20,
        textDecorationLine: "underline",
    }
})