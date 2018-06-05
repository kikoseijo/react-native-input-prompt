// @flow
import * as React from 'react';
import { View, Text, Button, TextInput, Dimensions, Modal, TouchableOpacity } from 'react-native';
import styles from './styles';

type Props = {
	title: string,
	visible: boolean,
	placeholder: string,
	cancelText?: string,
	submitText?: string,
	cancelButtonStyle?: Object | number,
	submitButtonStyle?: Object | number,
	cancelButtonTextStyle?: Object | number,
	submitButtonTextStyle?: Object | number,
	titleStyle?: Object | number,
	dialogStyle?: Object | number,
	onChangeText?: Function,
	onSubmit: Function,
	onCancel: Function
};

type State = {
	value: string
};

export default class Prompt extends React.Component<Props, State> {
	static defaultProps = {
		title: 'Title',
		visible: false,
		placeholder: 'Placeholder',
		cancelText: 'Cancel',
		submitText: 'Submit',
		cancelButtonStyle: {},
		cancelButtonTextStyle: {},
		submitButtonStyle: {},
		submitButtonTextStyle: {},
		titleStyle: {},
		dialogStyle: {},
		onChangeText: () => {},
		onSubmit: () => {},
		onCancel: () => {}
	};
	constructor() {
		super();
		this.state = {
			value: ''
		};
	}
	_onChangeText(value) {
		this.setState({
			value: value
		});
		this.props.onChangeText && this.props.onChangeText(value);
	}

	_onSubmit() {
		this.props.onSubmit(this.state.value);
		this.setState({ value: '' });
	}

	_onCancel() {
		this.props.onCancel();
		this.setState({ value: '' });
	}
	render() {
		return (
			<Modal
				transparent={true}
				animationType="fade"
				visible={this.props.visible}
				onRequestClose={this._onCancel.bind(this)}>
				<View style={styles.screenOverlay}>
					<View style={[styles.dialogPrompt, this.props.dialogStyle]}>
						<Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
						<TextInput
							placeholder={this.props.placeholder}
							style={styles.textInput}
							onChangeText={this._onChangeText.bind(this)}
							onSubmitEditing={this._onSubmit.bind(this)}
							autoFocus={true}
						/>
						<View style={styles.buttonsOuterView}>
							<View style={styles.buttonsInnerView}>
								<TouchableOpacity
									style={[styles.button, this.props.cancelButtonStyle]}
									onPress={this._onCancel.bind(this)}>
									<Text style={[styles.cancelButtonText, this.props.cancelButtonTextStyle]}>
										{this.props.cancelText}
									</Text>
								</TouchableOpacity>
								<View style={styles.buttonsDivider} />
								<TouchableOpacity
									style={[styles.button, this.props.submitButtonStyle]}
									onPress={this._onSubmit.bind(this)}>
									<Text style={[styles.submitButtonText, this.props.submitButtonTextStyle]}>
										{this.props.submitText}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}
