import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {

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
    fontSize: 25,
    marginBottom: 10,
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

export const gradient = {
  style: {
    width: 130,
    height: 130,
    borderRadius: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colors: [
    ['#FFEDBC', '#ED4264'],
    ['#FE5621', '#E81D62'],
    ['#FE9700', '#E74C3C'],
    ['#9B26AF', '#6639B6'],
    ['#c2e59c', '#64b3f4'],
    ['#F15F79', '#B24592'],
    ['#FFC371', '#FF5F6D'],
    ['#26D0CE', '#1A2980'],
  ],
}
