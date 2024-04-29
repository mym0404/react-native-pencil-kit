package com.pencilkit

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.PencilKitViewManagerInterface
import com.facebook.react.viewmanagers.PencilKitViewManagerDelegate

@ReactModule(name = PencilKitViewManager.NAME)
class PencilKitViewManager : SimpleViewManager<PencilKitView>(),
  PencilKitViewManagerInterface<PencilKitView> {
  private val mDelegate: ViewManagerDelegate<PencilKitView>

  init {
    mDelegate = PencilKitViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<PencilKitView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): PencilKitView {
    return PencilKitView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: PencilKitView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "PencilKitView"
  }
}
