import React, { useEffect, useState, useCallback } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import color from '../../Utils/color';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';

export default function BookingModel({ businessId, hideModal }) {
    const [timeList, setTimeList] = useState([]);
    const [selectTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState();
    const [note, setNote] = useState('');
    const [address, setAddress] = useState('');
    const [phNumber, setPhNumber] = useState('');
    const { user } = useUser();

    useEffect(() => {
        getTime();
    }, []);

    const getTime = useCallback(() => {
        const timeList = [];
        for (let i = 8; i < 12; i++) {
            timeList.push({
                time: i + ':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }
        for (let i = 1; i < 8; i++) {
            timeList.push({
                time: i + ':00 PM'
            })
            timeList.push({
                time: i + ':30 PM'
            })
        }
        setTimeList(timeList);
    }, []);

    // Create Booking Method
    const createNewBooking = () => {
        if (!selectTime || !selectedDate) {
            ToastAndroid.show('Please select Date and Time', ToastAndroid.LONG)
            return;
        }
        const data = {
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress,
            time: selectTime,
            date: moment(selectedDate).format('DD-MMM-yyyy'),
            note: note,
            businessId: businessId,
            userAddress:address,
            userImage:user?.imageUrl,
            phNumber:phNumber
        }
        GlobalApi.createBooking(data).then(resp => {
            ToastAndroid.show('Booking Created Succesfully', ToastAndroid.LONG)
            hideModal();
        })
    }

    const handleDateChange = useCallback((date) => {
        setSelectedDate(date);
    }, []);

    const handleTimeSelect = useCallback((time) => {
        setSelectedTime(time);
    }, []);

    return (
        <ScrollView>
            <KeyboardAvoidingView style={{ padding: 20, paddingTop: 30 }}>
                <TouchableOpacity
                    onPress={() => hideModal()}
                    style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Ionicons name="arrow-back-sharp" size={30} color="black" />
                    <Text style={{ fontSize: 25, fontFamily: 'outfit-medium', textTransform: 'capitalize' }}>Booking</Text>
                </TouchableOpacity>
                {/* calendar Section */}
                <Text style={styles.header}>Select Date</Text>

                <View style={styles.calendarContainer}>
                    <CalendarPicker
                        onDateChange={handleDateChange}
                        width={300}
                        minDate={Date.now()}
                        todayBackgroundColor={color.BLACK}
                        todayTextStyle={{ color: color.WHITE }}
                        selectedDayColor={color.PRIMARY}
                        selectedDayTextColor={color.WHITE}
                        scaleFactor={375}
                    />
                </View>

                {/* Time Select Section*/}
                <View>
                    <Text style={styles.header}>Select Time Slot</Text>

                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={timeList}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleTimeSelect(item.time)}>
                                <Text style={[styles.timeSlot, selectTime === item.time && styles.selectedTimeSlot]}>{item.time}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </View>
                <Text style={styles.header}>Enter Contact number</Text>
                <TextInput
                    placeholder='Contact number'
                    style={styles.noteTextArea}
                    numberOfLines={1}
                    onChangeText={(text) => setPhNumber(text)}
                />
                <Text style={styles.header}>Enter Service Address</Text>
                <TextInput
                    placeholder='Service Address'
                    style={styles.noteTextArea}
                    numberOfLines={4}
                    multiline={true}
                    onChangeText={(text) => setAddress(text)}
                />
                {/* Note Section */}
                <Text style={styles.header}>Add Note</Text>
                <TextInput
                    placeholder='Message'
                    style={styles.noteTextArea}
                    numberOfLines={4}
                    multiline={true}
                    onChangeText={(text) => setNote(text)}
                />
                {/* Confirmation Button */}
                <TouchableOpacity style={{ marginTop: 20 }} onPress={createNewBooking}>
                    <Text style={styles.confirmButton}>Confirm & Book</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    calendarContainer: {
        backgroundColor: color.PRIMARY_LIGHT,
        padding: 20,
        borderRadius: 20,
    },
    header: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginBottom: 10,
        marginTop: 20
    },
    timeSlot: {
        padding: 10,
        borderWidth: 1,
        borderColor: color.PRIMARY,
        borderRadius: 99,
        paddingHorizontal: 18,
        color: color.PRIMARY
    },
    selectedTimeSlot: {
        backgroundColor: color.PRIMARY,
        color: color.WHITE
    },
    noteTextArea: {
        borderWidth: 1,
        borderRadius: 15,
        textAlignVertical: 'top',
        padding: 20,
        fontSize: 16,
        fontFamily: 'outfit',
        borderColor: color.PRIMARY
    },
    confirmButton: {
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        fontSize: 18,
        color: color.WHITE,
        padding: 13,
        backgroundColor: color.PRIMARY,
        borderRadius: 99,
        marginBottom: 20,
        elevation: 2,
    },
});
