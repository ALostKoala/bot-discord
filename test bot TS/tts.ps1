$textFilePath = "D:\test bot TS\tmp_tts\file.txt"
#important - make sure this directory path ends with a slash
$outputDirectoryPath = "D:\test bot TS\tmp_tts\"
Add-Type -AssemblyName System.speech
$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer
$lineCounter = 0

foreach($line in get-content $textFilePath) {
	$speak.SetOutputToWaveFile($outputDirectoryPath + ($lineCounter -as [string]) + ".mp3")
	echo ("Writing file " + $outputDirectoryPath + ($lineCounter -as [string]) + ".mp3")
	$speak.Speak($line)
	$lineCounter++
}

$speak.Dispose()