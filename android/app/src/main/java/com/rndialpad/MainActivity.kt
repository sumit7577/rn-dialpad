package com.rndialpad

import android.content.Intent
import android.os.Bundle
import android.os.PersistableBundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.bridge.Arguments
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.messager.EventRepository


class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "rnDialpad"


  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate{
      return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
  }


    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        val sender = intent.getStringExtra("sender")
        val body = intent.getStringExtra("body")
        val threadId = intent.getLongExtra("threadId", -1L)
        val messageMap = Arguments.createMap().apply {
            putString("sender", sender)
            putString("body", body)
            putDouble("threadId", threadId.toDouble() ?: -1.0)
        }
        if(EventRepository.isInitialized()){
            EventRepository.emitEvent("onNotificationClick",messageMap)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?, persistentState: PersistableBundle?) {
        println("started Activity create")
        super.onCreate(savedInstanceState, persistentState)
    }
}
