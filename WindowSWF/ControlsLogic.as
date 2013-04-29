package{

	import adobe.utils.MMEndCommand;
	import adobe.utils.MMExecute;

	import flash.events.*;


	import flash.display.*;
	import fl.containers.*;
	import fl.controls.*;
	import fl.core.*;

	import assets.ControlLayout;


	public class ControlsLogic{

		private static const V_GAP:int = 10;

		private var layout:ControlLayout;

		private var expandControls:Array;
		private var rightControls:Array;

		private var expandDiffs:Array;
		private var rightDiffs:Array;
		private var vStack:Array;

		private var width:Number;
		private var height:Number;
		
		public function ControlsLogic(layout:ControlLayout){

			this.layout = layout;

			expandControls = [layout.fileRow.input,
								layout.sourceRow.input,
								layout.framesRow.input,
								layout.outputRow.input,
								layout.exportButton,
								layout.progressBar,
								layout.presetRow.comboBox,
								layout.decimalRow.input,
								layout.masksRow.input,
								layout.curvesRow.input,
								layout.expandRow.input,
								layout.applyTransformationsCheckBox,
								layout.convertPatternsToSymbolsCheckBox];

			rightControls = [   layout.fileRow.button,
								layout.customFramesRow,
								layout.presetRow.deleteButton];

			vStack = [	layout.sourceRow,
						layout.clippingRow,
						layout.framesRow,
						layout.customFramesRow,
						layout.fileRow,
						layout.outputRow,
						layout.exportButton,
						layout.progressBar,
						layout.presetRow,
						layout.decimalRow,
						layout.masksRow,
						layout.curvesRow,
						layout.expandRow,
						layout.applyTransformationsCheckBox,
						layout.convertPatternsToSymbolsCheckBox,
						layout.flattenMotionCheckBox];

		}

		public function setSize(w:Number, h:Number):void{
			width = w;
			height = h;
			update();
		}
		public function update():void{
			var w:Number = width;
			var h:Number = height;
			var i:int;

			var display:DisplayObject;
			var comp:UIComponent
			if(!expandDiffs){
				// init measurements


				expandDiffs = [];
				for(i=0; i<expandControls.length; ++i){
					display = expandControls[i];
					expandDiffs[i] = w-display.width;
				}

				rightDiffs = [];
				for(i=0; i<rightControls.length; ++i){
					display = rightControls[i];
					rightDiffs[i] = w-display.x-display.width;
				}
			}else{
				for(i=0; i<expandControls.length; ++i){
					display = expandControls[i];
					display.width = w-expandDiffs[i];
				}
				for(i=0; i<rightControls.length; ++i){
					display = rightControls[i];
					display.x = w-display.width-rightDiffs[i];
				}
			}

			var stack = V_GAP;
			for(i=0; i<vStack.length; ++i){
				display = vStack[i];
				if(display.visible){
					display.y = stack;
					stack += display.height+V_GAP;
				}
			}
		}
	}

}