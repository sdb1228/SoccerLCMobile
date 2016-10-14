import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.01)',
    flex: 1,
  },
  facilityText: {
    fontSize: 30,
    color: '#ffffff',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  spinnerContainer: {
    backgroundColor: 'rgba(0,0,0,0.01)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facilitiesContainer: {
    height: 50,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: 100,
  },
})
