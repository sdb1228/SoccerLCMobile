import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  gameView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 0.5,
  },
  teamsView: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  teamView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamText: {
    fontFamily: 'Helvetica',
    color: 'rgba(144,30,27,.9)',
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 3,
  },
  timeText: {
    fontFamily: 'Helvetica',
    color: '#888',
  },

  flipBaseView: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingTop: 3,
    paddingBottom: 9,
  },
  flipFrontView: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  flipBackView: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
})
