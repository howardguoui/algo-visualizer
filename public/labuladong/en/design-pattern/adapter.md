# Design Pattern: Adapter

> Source: https://labuladong.online/algo/en/design-pattern/adapter/
> Archived: labuladong.online

---

# Design Pattern: Adapter

In development, sometimes we find that we have rewritten a module, but its interface does not match other modules. Sometimes, we want to use a third-party library, but its interface does not meet our needs.

At this time, it is usually not possible or not wise to change old code or the source code of the third-party library. So, what should we do?

The **Adapter Pattern** in design patterns is very useful here. It lets us make objects with different interfaces work together.

Let’s look at an example to understand how the Adapter Pattern works. Suppose we have a `Chinese` class that only has a `speakChinese` method. It can only output Chinese:

```
// Adaptee: Only speaks Chinese
class Chinese {
    public void speakChinese() {
        System.out.println("你好世界！");
    }
}
``` 

But our system needs to output English. What should we do?

The solution is simple—let’s hire a translator to help translate Chinese into English:

```
// Target interface: We expect to output English
interface EnglishSpeaker {
    void speakEnglish();
}

// Adapter: Implements the target interface and holds an instance of the adaptee
class TranslatorAdapter implements EnglishSpeaker {
    private Chinese adaptee;

    // Pass the adaptee object through the constructor
    public TranslatorAdapter(Chinese adaptee) {
        this.adaptee = adaptee;
    }

    @Override
    public void speakEnglish() {
        // Call the adaptee method
        adaptee.speakChinese();
        // Add translation logic to meet the target interface
        System.out.println("Translated: Hello World!");
    }
}

// Client code
public class Main {
    public static void main(String[] args) {
        Chinese chinese = new Chinese();
        EnglishSpeaker adapter = new TranslatorAdapter(chinese);

        // For the client, it only knows the EnglishSpeaker interface and calls speakEnglish
        // The adapter correctly converts the interface and translates Chinese to English
        adapter.speakEnglish();
        // 你好世界！
        // Translated: Hello World!
    }
}
``` 

The Adapter Pattern mainly includes these core roles:

  * **Target** : The interface that client code expects. In this example, it is the `EnglishSpeaker` interface.
  * **Adaptee** : The class to be adapted. It has the required function, but its interface does not match the target. Here, it is the `Chinese` class.
  * **Adapter** : The bridge between the target and the adaptee. It implements the target interface, holds an adaptee instance, and converts calls from the target interface to the adaptee’s methods. In this example, it is the `TranslatorAdapter` class.
  * **Client** : Uses the target interface to interact with the adapter.

What we showed above is called an "object adapter". The adapter receives the adaptee object through the constructor, so it can call the adaptee’s methods.

There is also a "class adapter", where the adapter inherits the adaptee class. It can call the adaptee’s methods like this:

```
class TranslatorAdapter extends Chinese implements EnglishSpeaker {
    @Override
    public void speakEnglish() {
        // Call the adaptee method
        super.speakChinese();
        System.out.println("Translated: Hello World!");
    }
}
``` 

The two ways only differ in how to call the adaptee’s method. In essence, they are the same.

Modern software recommends using "composition over inheritance". Also, programming languages like Java do not support multiple inheritance. So, object adapters based on composition are more common than class adapters based on inheritance.

## More Scenarios

### Power Adapter

A power adapter in real life is a classic example of the adapter pattern. Home outlets provide 220V AC, but devices like phones and laptops need different DC voltages (like 5V, 9V, 15V, etc.). The power adapter acts as a “translator”, turning the 220V AC into the right DC voltage needed by the device.

Let's simulate a smart power adapter that can provide the right voltage according to device needs.

First, define the voltage type and data structure:

```
// Enum: Voltage type
public enum VoltageType {
    AC, // Alternating Current
    DC  // Direct Current
}

// Data class: Wrap value and type
public record Voltage(int value, VoltageType type) {
    @Override
    public String toString() {
        return String.format("%dV %s", value, type);
    }

    // Override equals and hashCode for correct comparison in lists
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Voltage voltage = (Voltage) o;
        return value == voltage.value && type == voltage.type;
    }
}
``` 

Then define the adaptee (household socket):

```
// Adaptee: Household socket
public class HouseholdSocket {
    public Voltage supply() {
        System.out.println("Household socket: provides -> 220V AC");
        return new Voltage(220, VoltageType.AC);
    }
}
``` 

Define the target interface (Smart Charging Protocol):

```
// Target: Smart charging protocol
public interface SmartChargeTarget {
    // Negotiate and provide voltage
    Voltage supplyVoltage(List<Voltage> deviceSupportedVoltages);
}
``` 

Implement the adapter (smart power adapter):

```
// Adapter: Smart power adapter
public class SmartPowerAdapter implements SmartChargeTarget {
    private final List<Voltage> adapterSupportedVoltages;
    private final HouseholdSocket adaptee;

    // Constructor allows defining different adapter specs
    public SmartPowerAdapter(HouseholdSocket adaptee, List<Voltage> supportedVoltages) {
        this.adaptee = adaptee;
        this.adapterSupportedVoltages = supportedVoltages;
        System.out.println("-> Adapter created, supports: " + this.adapterSupportedVoltages);
    }

    @Override
    public Voltage supplyVoltage(List<Voltage> deviceSupportedVoltages) {
        Voltage bestMatch = findBestVoltageMatch(deviceSupportedVoltages);

        if (bestMatch != null) {
            System.out.println("Adapter: negotiation succeeded, matched voltage: " + bestMatch);
            return convert(bestMatch);
        } else {
            System.out.println("Adapter: negotiation failed, no compatible voltage mode found.");
            return null;
        }
    }
    
    // Negotiation logic: Find the highest voltage both device and adapter support
    private Voltage findBestVoltageMatch(List<Voltage> deviceVoltages) {
        for (Voltage deviceVoltage : deviceVoltages) {
            if (adapterSupportedVoltages.contains(deviceVoltage)) {
                return deviceVoltage;
            }
        }
        return null;
    }

    private Voltage convert(Voltage dcOutput) {
        Voltage acInput = adaptee.supply();
        System.out.printf("Adapter: converts %s to %s\n", acInput, dcOutput);
        return dcOutput;
    }
}
``` 

Client code: Devices charge through the adapter:

```
class Device {
    private final String deviceName;
    private final List<Voltage> supportedVoltages;

    // Constructor, specify device name and voltages it supports
    public Device(String deviceName, List<Voltage> supportedVoltages) {
        this.deviceName = deviceName;
        this.supportedVoltages = supportedVoltages;
    }

    public void startCharging(SmartChargeTarget charger) {
        Voltage finalVoltage = charger.supplyVoltage(supportedVoltages);

        if (finalVoltage != null) {
            System.out.printf("%s: ✔ Charging at: %s%n", deviceName, finalVoltage);
        } else {
            System.out.printf("%s: ❌ Adapter does not support my charging voltage%n", deviceName);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        // 220V household socket
        HouseholdSocket socket = new HouseholdSocket();

        // Create an adapter supporting 15V, 9V, 5V
        SmartPowerAdapter powerfulAdapter = new SmartPowerAdapter(socket, List.of(
            new Voltage(15, VoltageType.DC),
            new Voltage(9, VoltageType.DC),
            new Voltage(5, VoltageType.DC)
        ));

        // Scenario 1: Modern phone uses the universal adapter, negotiates best voltage
        Device modernPhone = new Device("iPhone 17", List.of(
            new Voltage(15, VoltageType.DC),
            new Voltage(9, VoltageType.DC),
            new Voltage(5, VoltageType.DC)
        ));

        modernPhone.startCharging(powerfulAdapter);
        // Adapter: negotiation succeeded, matched voltage: 15V DC
        // Household socket: provides -> 220V AC
        // Adapter: converts 220V AC to 15V DC
        // iPhone 17: ✔ Charging at: 15V DC

        // Scenario 2: Old phone uses universal adapter,
        // negotiates to a lower supported voltage
        Device oldPhone = new Device("Nokia", List.of(
            // Only supports 5V
            new Voltage(5, VoltageType.DC)
        ));
        oldPhone.startCharging(powerfulAdapter);
        // Adapter: negotiation succeeded, matched voltage: 5V DC
        // Household socket: provides -> 220V AC
        // Adapter: converts 220V AC to 5V DC
        // Nokia: ✔ Charging at: 5V DC

        // Scenario 3: Cannot adapt, charging refused
        // Create an old adapter that only outputs 5V
        SmartPowerAdapter oldAdapter = new SmartPowerAdapter(socket, List.of(
            new Voltage(5, VoltageType.DC)
        ));
        // Device needs at least 15V to charge
        Device gamingDevice = new Device("Gaming Device", List.of(
            new Voltage(15, VoltageType.DC)
        ));
        gamingDevice.startCharging(oldAdapter);
        // Adapter: negotiation failed, no compatible voltage mode found.
        // Gaming Device: ❌ Adapter does not support my charging voltage.
    }
}
``` 

This example shows the core idea of the adapter pattern:

  * **Target** : The `SmartChargeTarget` interface, which defines the smart charging negotiation protocol.
  * **Adaptee** : The `HouseholdSocket` class, which can only provide 220V AC.
  * **Adapter** : The `SmartPowerAdapter` class, which converts 220V AC into DC needed by devices.
  * **Client** : Various electronic devices use the adapter to get power.

With the adapter, devices with different voltage needs can all get the right power from one household socket.

### Character Stream Adapter

When your program reads a file, it gets a byte stream first. If you want to read a text file, an adapter is needed to turn the byte stream into a character stream that we can read as text.

In Java’s I/O library, the `InputStream` class reads byte streams, while the `InputStreamReader` class implements the `Readable` interface and converts the byte stream into a character stream.

In this scenario:

  * **Target** : `Readable` interface, expects to read text as characters.
  * **Adaptee** : `InputStream` class, only reads byte stream.
  * **Adapter** : `InputStreamReader` class, implements `Readable` and converts bytes to characters.
  * **Client** : The programmer, who can now use the `Readable` API to read files as text.

```
// InputStream reads bytes (Adaptee)
InputStream is = new FileInputStream("test.txt");

// InputStreamReader is an adapter, turns bytes to chars (Target)
InputStreamReader reader = new InputStreamReader(is, StandardCharsets.UTF_8);

// Now we can use Reader's API to read characters from file
// read method returns an ASCII code of a character
int character;
while ((character = reader.read()) != -1) {
    System.out.print((char) character);
}

reader.close();
``` 

## Summary

Main advantages of adapter pattern:

  1. **More flexible and extensible code** : Client code does not depend on the specific adaptee, so you can replace the adaptee without changing client code.
  2. **Follows the single responsibility principle** : The logic for interface conversion is in the adapter, not scattered in your main code.

The main disadvantage:

**Code can become more complex** : You need to write additional adapter classes and target interfaces. If you can change the adaptee directly, it's simpler.

To sum up: when you need to use an existing component that does not have a compatible interface, the adapter pattern is a very powerful and practical tool.

Last updated: 03/14/2026, 12:17 AM
