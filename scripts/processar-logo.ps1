Add-Type -AssemblyName System.Drawing
$root = Get-Location

function Make-Feathered($srcPath, $outPath, $half, $r0, $r1) {
  $fmt = [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
  $size = 2 * $half
  $src = New-Object System.Drawing.Bitmap((Join-Path $root $srcPath))
  $cx = [int]($src.Width / 2)
  $cy = [int]($src.Height / 2)
  $crop = New-Object System.Drawing.Bitmap($size, $size, $fmt)
  $g = [System.Drawing.Graphics]::FromImage($crop)
  $srcRect = New-Object System.Drawing.Rectangle(($cx - $half), ($cy - $half), $size, $size)
  $dstRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
  $g.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $src.Dispose()
  $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
  $data = $crop.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, $fmt)
  $stride = $data.Stride
  $len = $stride * $size
  $buf = New-Object byte[] $len
  [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $buf, 0, $len)
  for ($y = 0; $y -lt $size; $y++) {
    $dy = $y - $half
    $row = $y * $stride
    for ($x = 0; $x -lt $size; $x++) {
      $dx = $x - $half
      $r = [math]::Sqrt($dx * $dx + $dy * $dy)
      if ($r -le $r0) { $m = 1.0 } elseif ($r -ge $r1) { $m = 0.0 } else { $m = ($r1 - $r) / ($r1 - $r0) }
      $i = $row + $x * 4
      $buf[$i + 3] = [byte][math]::Round($buf[$i + 3] * $m)
    }
  }
  [System.Runtime.InteropServices.Marshal]::Copy($buf, 0, $data.Scan0, $len)
  $crop.UnlockBits($data)
  $crop.Save((Join-Path $root $outPath), [System.Drawing.Imaging.ImageFormat]::Png)
  $crop.Dispose()
  Write-Output "wrote $outPath (${size}x${size})"
}

Make-Feathered "public\logo-perfil-claro.png" "public\logo-clara.png" 380 300 375
Make-Feathered "public\logo-perfil.png" "public\logo-escura.png" 380 300 375

$srcD = New-Object System.Drawing.Bitmap((Join-Path $root "public\logo-perfil.png"))
$ico = New-Object System.Drawing.Bitmap(512, 512)
$gi = [System.Drawing.Graphics]::FromImage($ico)
$gi.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$icoSrc = New-Object System.Drawing.Rectangle(220, 220, 640, 640)
$icoDst = New-Object System.Drawing.Rectangle(0, 0, 512, 512)
$gi.DrawImage($srcD, $icoDst, $icoSrc, [System.Drawing.GraphicsUnit]::Pixel)
$gi.Dispose()
$ico.Save((Join-Path $root "app\icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$ico.Dispose()
$srcD.Dispose()
Write-Output "wrote app\icon.png (512x512, solido)"
