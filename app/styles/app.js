import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  timerLabel: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  colonLabel: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  listViewStyle: {
    backgroundColor: 'transparent',
    height: 50,
  },
  remainingTimeLabel: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'transparent',
    marginTop: 50,
    marginBottom: 70,
  },
  modal: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 15,
    marginBottom: 10,
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  modalOkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  modalOkButtonText: {
    fontSize: 15,
    color: '#00f',
  },
  closeIconParent: {
    width: 300,
  },
  textContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  error: {
    color: '#FF0000',
  },
  textInput: {
    textAlign: 'center',
    height: 50,
    color: '#000000',
    fontSize: 15,
    width: 50,
    marginRight: 2,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
  },
  rowText: {
    color: '#FFFFFF',
  },
  okayButton: {
    borderColor: '#246300',
    borderWidth: 0.5,
    borderRadius: 3,
    padding: 5,
    backgroundColor: '#83EB46',
  },
  inputFormGroup: {
    marginBottom: 8,
    flex: 1,
    flexDirection: 'row',
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  button: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 50,
  },
  gradientContainer: {
    flex: 1,
    borderRadius: 65,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
})
