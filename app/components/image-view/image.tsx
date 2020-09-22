import React, { useState } from "react"
import { ActivityIndicator, Image, View } from "react-native"
import { ImageProps } from "react-native"

const ImageView = (props: ImageProps) => {
  const [loading, setLoading] = useState(true)

  return (
    <View style={props.style}>
      <Image {...props} onLoadEnd={() => setLoading(false)} />
      {loading && (
        <ActivityIndicator
          size="small"
          color="#CDCDCD"
          style={{
            ...(props.style as object),
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            backgroundColor: "#222222",
          }}
        />
      )}
    </View>
  )
}

export default ImageView
