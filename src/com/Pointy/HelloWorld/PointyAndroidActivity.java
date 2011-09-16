package com.Pointy.HelloWorld;

import android.os.Bundle;

import com.phonegap.DroidGap;

public class PointyAndroidActivity extends DroidGap {
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/index.html");
	}
}