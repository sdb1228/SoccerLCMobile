import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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
  modalCancelButton: {
    marginTop: 10,
    fontSize: 15,
    marginLeft: 50,
    color: '#00f',
  },
  modalOkButtonText: {
    marginTop: 10,
    fontSize: 15,
    color: '#00f',
  },
  modalButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})
