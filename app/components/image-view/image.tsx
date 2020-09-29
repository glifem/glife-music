/* eslint-disable import/no-duplicates */
import React, { useState } from "react"
import { ActivityIndicator, View } from "react-native"
import FastImage, { FastImageProps } from "react-native-fast-image"

const ImageView = (props: FastImageProps) => {
	// TODO: Fix loading spinner
	const [loading, setLoading] = useState(false)

	return (
		<View style={props.style}>
			<FastImage {...props} onLoadEnd={() => setLoading(false)} />
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
