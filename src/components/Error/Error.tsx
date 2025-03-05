import { View, Text } from "react-native"
import {styles} from './Error.styles'
import {ErrorProps} from './Error.types'

export const Error = ({onRefresh, error}:ErrorProps) => {
    return <View style={styles.centered}>
    <Text style={styles.errorText}>{error}</Text>
    <Text style={styles.retryText} onPress={onRefresh}>
      Tap to retry
    </Text>
  </View>
}